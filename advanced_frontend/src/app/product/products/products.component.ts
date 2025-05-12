import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { ProductService, Product } from '../../services/product.service';
import { CompareService } from '../../services/compare.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  categories: string[] = ['All', 'electronics', 'clothing', 'home', 'sports', 'books', 'health'];

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService,
    private compareService: CompareService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...data];
      },
      error: (err) => {
        console.error('Ürünler alınırken hata oluştu:', err);
      }
    });
  }

  addToCart(product: any) {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    this.cartService.addToCart(cartItem);
  }

  quickView(productId: number) {
    this.router.navigate(['/product', productId]);
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

  addToCompare(product: Product): void {
    const success = this.compareService.addToCompare(product);
    if (!success) {
      alert('You can compare up to 3 products at a time.');
    }
  }
}