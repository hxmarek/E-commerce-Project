package com.example.advanced_backend.dto;

public class RegisterResponse {
    private String token;

    public RegisterResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
