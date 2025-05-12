package com.example.advanced_backend.controller;

import com.example.advanced_backend.model.ProductComment;
import com.example.advanced_backend.model.User;
import com.example.advanced_backend.products.Product;
import com.example.advanced_backend.service.ProductCommentService;
import com.example.advanced_backend.service.ProductService;
import com.example.advanced_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class ProductCommentController {

    private final ProductCommentService productCommentService;
    private final ProductService productService;


    @Autowired
    public ProductCommentController(ProductCommentService productCommentService,
                                  ProductService productService) {
        this.productCommentService = productCommentService;
        this.productService = productService;

    }

    @PostMapping("/product/{productId}")
    public ResponseEntity<ProductComment> createComment(
            @PathVariable Long productId,
            @RequestParam Integer rating,
            @RequestParam String comment,
            @AuthenticationPrincipal User user) {
        
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        
        Product product = productService.getProductById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        ProductComment createdComment = productCommentService.createComment(product, user, rating, comment);
        return ResponseEntity.ok(createdComment);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductComment>> getProductComments(@PathVariable Long productId) {
        List<ProductComment> comments = productCommentService.getCommentsByProductId(productId);
        return ResponseEntity.ok(comments);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<ProductComment> updateComment(
            @PathVariable Long commentId,
            @RequestParam Integer rating,
            @RequestParam String comment,
            @AuthenticationPrincipal User user) {
        
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        
        ProductComment updatedComment = productCommentService.updateComment(commentId, rating, comment);
        return ResponseEntity.ok(updatedComment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        productCommentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
} 