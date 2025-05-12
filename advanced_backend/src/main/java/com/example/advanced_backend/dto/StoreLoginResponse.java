package com.example.advanced_backend.dto;

public class StoreLoginResponse {
    private String token;
    private String storeName;

    public StoreLoginResponse(String token, String storeName) {
        this.token = token;
        this.storeName = storeName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }
} 