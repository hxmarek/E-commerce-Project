package com.example.advanced_backend.dto;

import lombok.Data;

@Data
public class AdminLoginRequest {
    private String username;
    private String password;
} 