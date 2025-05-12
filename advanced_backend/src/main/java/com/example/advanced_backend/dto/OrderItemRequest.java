package com.example.advanced_backend.dto;

import lombok.Data;

//@Data
//public class OrderItemRequest {
//    private String productName;
//    private Integer quantity;
//}

@Data
public class OrderItemRequest {
    private Long productId;
    private Integer quantity;
}