import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-store-products',
  standalone: false,
  templateUrl: './store-products.component.html',
  styleUrl: './store-products.component.css'
})
export class StoreProductsComponent {
  store_name:string="";
  products: Product[] = [];
    filteredProducts: Product[] = [];
    selectedCategory: string = '';
    searchQuery: string = '';
    categories: string[] = ['All', 'electronics', 'clothing', 'home', 'sports', 'books', 'health'];
  
    constructor(
      private router: Router, private http:HttpClient
    ) {}
  
    ngOnInit(): void {
      const token = localStorage.getItem('store_token');
    
      if (!token) {
        console.error('Token bulunamadı. Kullanıcı giriş yapmamış olabilir.');
        return; // Token yoksa isteği göndermiyoruz.
      }

      this.store_name = localStorage.getItem('storeName') || 'Welcome';
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

    
      this.http.get<Product[]>('http://localhost:8080/api/products/my-products', { headers })
        .subscribe({
          next: (response) => {
            this.products = response;
          },
          error: (error) => {
            console.error('Ürünler yüklenirken hata oluştu:', error);
          }
        });
    }
    onCategoryChange(category: string): void {
      this.selectedCategory = category;
      this.applyFilters();
    }
  
    onSearchChange(searchQuery: string): void {
      this.searchQuery = searchQuery.toLowerCase();
      this.applyFilters();
    }
  
    private applyFilters(): void {
      let filtered = [...this.products];
  
      if (this.selectedCategory && this.selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }
  
      if (this.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery)
        );
      }
  
      this.filteredProducts = filtered;
    }
  
    getStarRating(rating: number): string[] {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
  
      for (let i = 0; i < fullStars; i++) {
        stars.push('fas fa-star');
      }
  
      if (hasHalfStar) {
        stars.push('fas fa-star-half-alt');
      }
  
      const emptyStars = 5 - stars.length;
      for (let i = 0; i < emptyStars; i++) {
        stars.push('far fa-star');
      }
  
      return stars;
    }
  

}
