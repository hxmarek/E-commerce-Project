package com.example.advanced_backend.controller;

import com.example.advanced_backend.dto.OrderResponse;
import com.example.advanced_backend.dto.OrderItemResponse;
import com.example.advanced_backend.model.Order;
import com.example.advanced_backend.model.OrderItem;
import com.example.advanced_backend.model.Store;
import com.example.advanced_backend.repository.OrderItemRepository;
import com.example.advanced_backend.repository.OrderRepository;
import com.example.advanced_backend.repository.ProductRepository;
import com.example.advanced_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/store/orders")
@RequiredArgsConstructor
public class StoreOrderController {


    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getStoreOrders(@AuthenticationPrincipal Store store) {
        // Get all products of the store
        List<Long> storeProductIds = productRepository.findByStoreName(store.getName())
                .stream()
                .map(product -> product.getId())
                .collect(Collectors.toList());

        // Get all order items that contain store's products
        List<Order> orders = orderItemRepository.findAll()
                .stream()
                .filter(item -> storeProductIds.contains(item.getProduct().getId()))
                .map(OrderItem::getOrder)
                .distinct()
                .collect(Collectors.toList());

        List<OrderResponse> responses = orders.stream()
                .map(order -> {
                    List<OrderItemResponse> itemResponses = orderItemRepository.findByOrder(order)
                            .stream()
                            .filter(item -> storeProductIds.contains(item.getProduct().getId()))
                            .map(item -> new OrderItemResponse(
                                    item.getProduct().getId(),
                                    item.getProduct().getName(),
                                    item.getQuantity()
                            ))
                            .collect(Collectors.toList());

                    return new OrderResponse(
                            order.getId(),
                            order.getPaymentType(),
                            order.getPaymentDate(),
                            order.getPaymentTime(),
                            order.getOrderStatus(),
                            order.getTotalAmount(),
                            itemResponses
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status,
            @AuthenticationPrincipal Store store) {
        
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Verify that the order contains products from this store
        boolean hasStoreProducts = orderItemRepository.findByOrder(order)
                .stream()
                .anyMatch(item -> item.getProduct().getStore().getName().equals(store.getName()));

        if (!hasStoreProducts) {
            throw new RuntimeException("This order does not contain products from your store");
        }

        order.setOrderStatus(status);
        Order updatedOrder = orderRepository.save(order);

        List<OrderItemResponse> itemResponses = orderItemRepository.findByOrder(updatedOrder)
                .stream()
                .filter(item -> item.getProduct().getStore().getName().equals(store.getName()))
                .map(item -> new OrderItemResponse(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity()
                ))
                .collect(Collectors.toList());

        OrderResponse response = new OrderResponse(
                updatedOrder.getId(),
                updatedOrder.getPaymentType(),
                updatedOrder.getPaymentDate(),
                updatedOrder.getPaymentTime(),
                updatedOrder.getOrderStatus(),
                updatedOrder.getTotalAmount(),
                itemResponses
        );

        return ResponseEntity.ok(response);
    }
} 