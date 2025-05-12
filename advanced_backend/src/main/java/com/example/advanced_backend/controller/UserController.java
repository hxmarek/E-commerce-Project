package com.example.advanced_backend.controller;

import com.example.advanced_backend.model.User;
import com.example.advanced_backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Authenticated kullanıcının profilini döner
    @GetMapping("/profile")
    public User getProfile(@AuthenticationPrincipal User user) {
        return user;
    }
}