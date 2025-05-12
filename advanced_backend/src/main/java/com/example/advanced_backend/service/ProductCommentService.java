package com.example.advanced_backend.service;

import com.example.advanced_backend.model.ProductComment;
import com.example.advanced_backend.model.User;
import com.example.advanced_backend.products.Product;
import com.example.advanced_backend.repository.ProductCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductCommentService {

    private final ProductCommentRepository productCommentRepository;

    @Autowired
    public ProductCommentService(ProductCommentRepository productCommentRepository) {
        this.productCommentRepository = productCommentRepository;
    }

    public ProductComment createComment(Product product, User user, Integer rating, String comment) {
        ProductComment productComment = new ProductComment();
        productComment.setProduct(product);
        productComment.setUser(user);
        productComment.setRating(rating);
        productComment.setComment(comment);
        productComment.setDateTime(LocalDateTime.now());
        
        return productCommentRepository.save(productComment);
    }

    public List<ProductComment> getCommentsByProduct(Product product) {
        return productCommentRepository.findByProduct(product);
    }

    public List<ProductComment> getCommentsByProductId(Long productId) {
        return productCommentRepository.findByProductId(productId);
    }

    public void deleteComment(Long commentId) {
        productCommentRepository.deleteById(commentId);
    }

    public ProductComment updateComment(Long commentId, Integer rating, String comment) {
        ProductComment existingComment = productCommentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        existingComment.setRating(rating);
        existingComment.setComment(comment);
        
        return productCommentRepository.save(existingComment);
    }
} 