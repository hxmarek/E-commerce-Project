package com.example.advanced_backend.dto;

public class StoreRegisterResponse {
    private String token;

    public StoreRegisterResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
} 