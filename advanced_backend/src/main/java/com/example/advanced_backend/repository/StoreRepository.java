package com.example.advanced_backend.repository;

import com.example.advanced_backend.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, String> {
    Optional<Store> findByEmail(String email);
} 