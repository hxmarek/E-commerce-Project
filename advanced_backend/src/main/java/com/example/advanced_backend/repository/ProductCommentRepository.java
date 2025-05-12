package com.example.advanced_backend.repository;

import com.example.advanced_backend.model.ProductComment;
import com.example.advanced_backend.products.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCommentRepository extends JpaRepository<ProductComment, Long> {
    List<ProductComment> findByProduct(Product product);
    List<ProductComment> findByProductId(Long productId);
} 