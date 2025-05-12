package com.example.advanced_backend.service;

import com.example.advanced_backend.products.Product;
import com.example.advanced_backend.repository.ProductRepository;
import com.example.advanced_backend.model.Store;
import com.example.advanced_backend.dto.ProductCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByStoreName(String storeName) {
        return productRepository.findByStoreName(storeName);
    }

    public Product createProduct(ProductCreateRequest request, Store store) {
        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setImage(request.getImage());
        product.setCategory(request.getCategory());
        product.setRating(0.0);
        product.setReviewCount(0);
        product.setStore(store);
        
        return productRepository.save(product);
    }

    public boolean deleteProduct(Long productId, Store store) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            // Check if the product belongs to the store
            if (product.getStore().getName().equals(store.getName())) {
                productRepository.delete(product);
                return true;
            }
        }
        return false;
    }
}

