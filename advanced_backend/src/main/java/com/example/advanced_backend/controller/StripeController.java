package com.example.advanced_backend.controller;

import com.example.advanced_backend.dto.PaymentRequest;
import com.example.advanced_backend.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // frontend'e izin ver
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/payment-intent")
    public Map<String, Object> createPaymentIntent(@RequestBody PaymentRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String clientSecret = stripeService.createPaymentIntent(request.getAmount(), request.getPaymentMethodId());
            response.put("clientSecret", clientSecret);
        } catch (Exception e) {
            response.put("error", e.getMessage());
        }
        return response;
    }
}
