import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
}

interface Store {
  name: string;
  email: string;
  products: Product[];
}

@Component({
  selector: 'app-adminstores',
  standalone: false,
  templateUrl: './adminstores.component.html',
  styleUrl: './adminstores.component.css'
})
export class AdminstoresComponent {

  stores: Store[] = [];
  selectedStoreIndex: number | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStores();
  }

  fetchStores() {
    const token = localStorage.getItem('adminToken'); // Token localStorage'dan
    if (!token) {
      this.errorMessage = 'Token bulunamadı. Lütfen giriş yapın.';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Store[]>('http://localhost:8080/api/auth/admin/stores', { headers })
      .subscribe({
        next: (data) => {
          this.stores = data;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Mağazalar alınamadı.';
        }
      });
  }

  toggleProducts(index: number) {
    if (this.selectedStoreIndex === index) {
      this.selectedStoreIndex = null;
    } else {
      this.selectedStoreIndex = index;
    }
  }

}
