package com.example.advanced_backend.service;

import com.example.advanced_backend.dto.OrderItemRequest;
import com.example.advanced_backend.dto.OrderItemResponse;
import com.example.advanced_backend.dto.OrderRequest;
import com.example.advanced_backend.dto.OrderResponse;
import com.example.advanced_backend.model.Order;
import com.example.advanced_backend.model.OrderItem;
import com.example.advanced_backend.model.User;
import com.example.advanced_backend.products.Product;
import com.example.advanced_backend.repository.OrderItemRepository;
import com.example.advanced_backend.repository.OrderRepository;
import com.example.advanced_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

//@Service
//@RequiredArgsConstructor
//public class OrderService {
//
//    private final OrderRepository orderRepository;
//    private final OrderItemRepository orderItemRepository;
//
//    public Order createOrder(OrderRequest orderRequest, User user) {
//        Order order = new Order();
//        order.setUserId(user.getId());
//        order.setPaymentType(orderRequest.getPaymentType());
//        order.setPaymentDate(LocalDate.now());
//        order.setPaymentTime(LocalTime.now());
//        order.setOrderStatus("Pending");
//        order.setTotalAmount(orderRequest.getTotalAmount());
//
//        Order savedOrder = orderRepository.save(order);
//
//        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
//            OrderItem item = new OrderItem();
//            item.setOrder(savedOrder);
//            item.setProductName(itemRequest.getProductName());
//            item.setQuantity(itemRequest.getQuantity());
//            orderItemRepository.save(item);
//        }
//
//        return savedOrder;
//    }
//
//    public List<Order> getOrdersByUserId(Long userId) {
//        return orderRepository.findByUserId(userId);
//    }
//}
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public Order createOrder(OrderRequest orderRequest, User user) {
        Order order = new Order();
        order.setUserId(user.getId());
        order.setPaymentType(orderRequest.getPaymentType());
        order.setPaymentDate(LocalDate.now());
        order.setPaymentTime(LocalTime.now());
        order.setOrderStatus("Pending");
        order.setTotalAmount(orderRequest.getTotalAmount());

        Order savedOrder = orderRepository.save(order);

        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemRequest.getProductId()));

            OrderItem item = new OrderItem();
            item.setOrder(savedOrder);
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            orderItemRepository.save(item);
        }

        return savedOrder;
    }

    public List<OrderResponse> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);

        List<OrderResponse> responses = new ArrayList<>();

        for (Order order : orders) {
            List<OrderItem> items = orderItemRepository.findByOrder(order);

            List<OrderItemResponse> itemResponses = items.stream()
                    .map(item -> new OrderItemResponse(
                            item.getProduct().getId(),
                            item.getProduct().getName(),
                            item.getQuantity()
                    ))
                    .toList();

            OrderResponse response = new OrderResponse(
                    order.getId(),
                    order.getPaymentType(),
                    order.getPaymentDate(),
                    order.getPaymentTime(),
                    order.getOrderStatus(),
                    order.getTotalAmount(),
                    itemResponses
            );

            responses.add(response);
        }

        return responses;
    }
}
