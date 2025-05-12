package com.example.advanced_backend.controller;

import com.example.advanced_backend.dto.OrderRequest;
import com.example.advanced_backend.dto.OrderResponse;
import com.example.advanced_backend.model.Order;
import com.example.advanced_backend.model.User;
import com.example.advanced_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest,
                                             @AuthenticationPrincipal User user) {
        Order createdOrder = orderService.createOrder(orderRequest, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders(@AuthenticationPrincipal User user) {
        List<OrderResponse> userOrders = orderService.getOrdersByUserId(user.getId());
        return ResponseEntity.ok(userOrders);
    }
}
