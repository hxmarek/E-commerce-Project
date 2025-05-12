import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

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
  selector: 'app-manage-orders',
  standalone: false,
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent {

  orders: Order[] = [];
  statuses: string[] = ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  token: string|null = 'store_token'; // Replace with actual token from storage or service

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.token=localStorage.getItem('store_token')
    this.fetchOrders();
  }

  fetchOrders(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<Order[]>('http://localhost:8080/api/store/orders', { headers })
      .subscribe({
        next: (data) => this.orders = data,
        error: (err) => console.error('Failed to fetch orders:', err)
      });
  }

  onStatusChange(event: Event, orderId: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    this.updateOrderStatus(orderId, newStatus);
  }
  


  updateOrderStatus(orderId: number, newStatus: string): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.put(`http://localhost:8080/api/store/orders/${orderId}/status?status=${newStatus}`, {}, { headers })
      .subscribe({
        next: () => {
          const order = this.orders.find(o => o.orderId === orderId);
          if (order) {
            order.orderStatus = newStatus; // UI’da gösterilen durum da güncellenmiş olur
          }
          console.log('status updated')
        },
        error: (err) => console.error(`Failed to update status for order ${orderId}:`, err)
      });
  }

}
