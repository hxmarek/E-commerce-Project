package com.example.advanced_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "admins")
@Data
public class Admin {
    @Id
    private String username;
    private String password;
    private String role = "admin";
} 