package com.example.advanced_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String paymentType;
    private LocalDate paymentDate;
    private LocalTime paymentTime;
    private String orderStatus;
    private Double totalAmount;
}
