package com.example.advanced_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private String paymentType;
    private LocalDate paymentDate;
    private LocalTime paymentTime;
    private String orderStatus;
    private Double totalAmount;
    private List<OrderItemResponse> items;
}
