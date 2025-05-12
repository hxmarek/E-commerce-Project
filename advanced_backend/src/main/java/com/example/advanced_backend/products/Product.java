package com.example.advanced_backend.products;

import com.example.advanced_backend.model.Store;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String image;
    private Double rating;
    private Integer reviewCount;
    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_name", referencedColumnName = "name")
    @JsonBackReference
    private Store store;

    // Getters and Setters


    public Double getPrice() {
        return price;
    }

    public Double getRating() {
        return rating;
    }
    public Integer getReviewCount() {
        return reviewCount;
    }
    public String getCategory() {
        return category;
    }
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getImage() {
        return image;
    }
    public Store getStore() {
        return store;
    }
    public void setStore(Store store) {
        this.store = store;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public void setRating(Double rating) {
        this.rating = rating;
    }
    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public void setImage(String image) {
        this.image = image;
    }
}