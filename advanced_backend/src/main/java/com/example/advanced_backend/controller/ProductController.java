package com.example.advanced_backend.controller;

import com.example.advanced_backend.model.Store;
import com.example.advanced_backend.products.Product;
import com.example.advanced_backend.service.ProductService;
import com.example.advanced_backend.dto.ProductCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Allow requests from Angular
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/my-products")
    public ResponseEntity<List<Product>> getMyProducts(@AuthenticationPrincipal Store store) {
        if (store == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(productService.getProductsByStoreName(store.getName()));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductCreateRequest request,
                                               @AuthenticationPrincipal Store store) {
        if (store == null) {
            return ResponseEntity.status(401).build();
        }
        Product createdProduct = productService.createProduct(request, store);
        return ResponseEntity.ok(createdProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id,
                                         @AuthenticationPrincipal Store store) {
        if (store == null) {
            return ResponseEntity.status(401).build();
        }
        
        boolean deleted = productService.deleteProduct(id, store);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).body("You don't have permission to delete this product or the product doesn't exist");
        }
    }
}