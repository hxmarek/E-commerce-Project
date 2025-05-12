package com.example.advanced_backend.service;

import com.example.advanced_backend.dto.RegisterRequest;
import com.example.advanced_backend.model.User;
import com.example.advanced_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.advanced_backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Kullanıcı bulunamadı.");
        }
        userRepository.deleteById(id);
    }

    public User registerUser(RegisterRequest request) {
        // Aynı e-mail ile kayıt varsa hata fırlat
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email zaten kullanılıyor!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }
}
