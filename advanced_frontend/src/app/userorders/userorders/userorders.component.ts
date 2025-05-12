import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
}

interface Order {
  orderId: number;
  paymentType: string;
  paymentDate: string;
  paymentTime: string;
  orderStatus: string;
  totalAmount: number;
  items: OrderItem[];
}

@Component({
  selector: 'app-userorders',
  standalone: false,
  templateUrl: './userorders.component.html',
  styleUrl: './userorders.component.css'
})
export class UserordersComponent {

  orders: Order[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.http.get<Order[]>('http://localhost:8080/orders')
      .subscribe({
        next: (data) => {
          this.orders = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Siparişler yüklenemedi.';
          this.loading = false;
        }
      });
  }


  writeComment(productId: number) {
    this.router.navigate(['/usercomments', productId]);
  }

}
