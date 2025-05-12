package com.example.advanced_backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String paymentType;
    private Double totalAmount;
    private List<OrderItemRequest> items;
}