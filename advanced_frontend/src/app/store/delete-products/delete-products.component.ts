import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-delete-products',
  standalone: false,
  templateUrl: './delete-products.component.html',
  styleUrl: './delete-products.component.css'
})
export class DeleteProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Set<number> = new Set();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const token = localStorage.getItem('store_token');
    
    if (!token) {
      console.error('Token bulunamadı. Kullanıcı giriş yapmamış olabilir.');
      return;
    }

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

  toggleProductSelection(productId: number): void {
    if (this.selectedProducts.has(productId)) {
      this.selectedProducts.delete(productId);
    } else {
      this.selectedProducts.add(productId);
    }
  }

  deleteSelectedProducts(): void {
    const token = localStorage.getItem('store_token');
    
    if (!token) {
      console.error('Token bulunamadı. Kullanıcı giriş yapmamış olabilir.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const deletePromises = Array.from(this.selectedProducts).map(productId => 
      this.http.delete(`http://localhost:8080/api/products/${productId}`, { headers }).toPromise()
    );

    Promise.all(deletePromises)
      .then(() => {
        alert('Seçili ürünler başarıyla silindi!');
        this.loadProducts();
        this.selectedProducts.clear();
      })
      .catch(error => {
        console.error('Ürünler silinirken hata oluştu:', error);
        alert('Ürünler silinirken bir hata oluştu!');
      });
  }

  goBack(): void {
    this.router.navigate(['/store/storeProduct']);
  }
}
