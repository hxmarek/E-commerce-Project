package com.example.advanced_backend.service;

import com.example.advanced_backend.dto.StoreRegisterRequest;
import com.example.advanced_backend.model.Store;
import com.example.advanced_backend.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    public Optional<Store> findByEmail(String email) {
        return storeRepository.findByEmail(email);
    }

    public Optional<Store> findByName(String name) {
        return storeRepository.findById(name);
    }

    public void deleteStore(String name) {
        if (!storeRepository.existsById(name)) {
            throw new RuntimeException("Mağaza bulunamadı.");
        }
        storeRepository.deleteById(name);
    }

    public Store registerStore(StoreRegisterRequest request) {
        // Aynı e-mail ile kayıt varsa hata fırlat
        if (storeRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email zaten kullanılıyor!");
        }

        // Aynı mağaza adı ile kayıt varsa hata fırlat
        if (storeRepository.findById(request.getName()).isPresent()) {
            throw new RuntimeException("Mağaza adı zaten kullanılıyor!");
        }

        Store store = new Store();
        store.setName(request.getName());
        store.setEmail(request.getEmail());
        store.setPassword(passwordEncoder.encode(request.getPassword()));

        return storeRepository.save(store);
    }

    public Store login(String email, String password) {
        Optional<Store> storeOptional = findByEmail(email);
        
        if (storeOptional.isEmpty()) {
            throw new RuntimeException("Mağaza bulunamadı.");
        }

        Store store = storeOptional.get();
        if (!passwordEncoder.matches(password, store.getPassword())) {
            throw new RuntimeException("Şifre hatalı.");
        }

        return store;
    }
} 