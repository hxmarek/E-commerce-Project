package com.example.advanced_backend.dto;

import lombok.Data;

@Data
public class ProductCreateRequest {
    private String name;
    private Double price;
    private String image;
    private String category;
} 