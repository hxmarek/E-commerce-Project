import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService, CartItem } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product!: Product;
  loading: boolean = true;
  error: boolean = false;
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        this.getProductComments(); // ✅ burada çağrılmalı
      },
      error: (err) => {
        console.error('Ürün bulunamadı:', err);
        this.error = true;
        this.loading = false;
        this.router.navigate(['/']);
      }
    });
  }
  getProductComments() {
    this.http.get<any[]>(`http://localhost:8080/api/comments/product/${this.product.id}`)
      .subscribe(data => {
        this.comments = data;
      });
  }

  addToCart(product: Product) {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    this.cartService.addToCart(cartItem);
  }
}