package com.example.advanced_backend.controller;
import com.example.advanced_backend.dto.LoginRequest;
import com.example.advanced_backend.dto.LoginResponse;
import com.example.advanced_backend.dto.RegisterRequest;
import com.example.advanced_backend.dto.RegisterResponse;
import com.example.advanced_backend.dto.StoreRegisterRequest;
import com.example.advanced_backend.dto.StoreRegisterResponse;
import com.example.advanced_backend.dto.StoreLoginRequest;
import com.example.advanced_backend.dto.StoreLoginResponse;
import com.example.advanced_backend.dto.AdminLoginRequest;
import com.example.advanced_backend.dto.AdminLoginResponse;
import com.example.advanced_backend.dto.AdminCreateRequest;
import com.example.advanced_backend.model.Admin;
import com.example.advanced_backend.model.User;
import com.example.advanced_backend.model.Store;
import com.example.advanced_backend.service.JwtService;
import com.example.advanced_backend.service.UserService;
import com.example.advanced_backend.service.StoreService;
import com.example.advanced_backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private StoreService storeService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        User user = userService.registerUser(request);
        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(new RegisterResponse(token));
    }

    @PostMapping("/store/register")
    public ResponseEntity<StoreRegisterResponse> registerStore(@RequestBody StoreRegisterRequest request) {
        try {
            var store = storeService.registerStore(request);
            String token = jwtService.generateToken(store.getEmail());
            return ResponseEntity.ok(new StoreRegisterResponse(token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StoreRegisterResponse(e.getMessage()));
        }
    }

    @PostMapping("/store/login")
    public ResponseEntity<?> loginStore(@RequestBody StoreLoginRequest request) {
        try {
            var store = storeService.login(request.getEmail(), request.getPassword());
            String token = jwtService.generateToken(store.getEmail());
            return ResponseEntity.ok(new StoreLoginResponse(token, store.getName()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userService.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı bulunamadı.");
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Şifre hatalı.");
        }

        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AdminLoginRequest request) {
        if (adminService.validateAdmin(request.getUsername(), request.getPassword())) {
            String token = jwtService.generateToken(request.getUsername());
            return ResponseEntity.ok(new AdminLoginResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Geçersiz admin bilgileri.");
    }

    @PostMapping("/admin/create")
    public ResponseEntity<?> createAdmin(@RequestBody AdminCreateRequest request) {
        try {
            // Önce bu kullanıcı adıyla admin var mı kontrol et
            if (adminService.findByUsername(request.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Bu kullanıcı adı zaten kullanılıyor.");
            }

            // Yeni admin oluştur
            adminService.createAdmin(request.getUsername(), request.getPassword());
            return ResponseEntity.ok("Admin başarıyla oluşturuldu.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Admin oluşturulurken bir hata oluştu: " + e.getMessage());
        }
    }

    @GetMapping("/admin/users")
    public ResponseEntity<?> getAllUsers(@AuthenticationPrincipal Admin admin) {
        if (admin == null || !"admin".equals(admin.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu işlem için admin yetkisi gereklidir.");
        }
        
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/admin/stores")
    public ResponseEntity<?> getAllStores(@AuthenticationPrincipal Admin admin) {
        if (admin == null || !"admin".equals(admin.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu işlem için admin yetkisi gereklidir.");
        }
        
        List<Store> stores = storeService.getAllStores();
        return ResponseEntity.ok(stores);
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, @AuthenticationPrincipal Admin admin) {
        if (admin == null || !"admin".equals(admin.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu işlem için admin yetkisi gereklidir.");
        }

        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("Kullanıcı başarıyla silindi.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/stores/{name}")
    public ResponseEntity<?> deleteStore(@PathVariable String name, @AuthenticationPrincipal Admin admin) {
        if (admin == null || !"admin".equals(admin.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu işlem için admin yetkisi gereklidir.");
        }

        try {
            storeService.deleteStore(name);
            return ResponseEntity.ok("Mağaza başarıyla silindi.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/")
    public String home() {
        return "index"; // src/main/resources/templates/index.html
    }
}
