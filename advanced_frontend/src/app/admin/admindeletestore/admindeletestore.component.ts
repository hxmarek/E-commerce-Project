import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admindeletestore',
  standalone: false,
  templateUrl: './admindeletestore.component.html',
  styleUrl: './admindeletestore.component.css'
})
export class AdmindeletestoreComponent {

  storeName: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  deleteStore() {
    const token = localStorage.getItem('adminToken'); // Token sakladığın yer
    if (!token) {
      this.message = 'Token bulunamadı. Lütfen giriş yapın.';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:8080/api/auth/admin/stores/${this.storeName}`, { headers,
      responseType: 'text' // Yanıtın JSON değil düz metin olduğunu belirtiyoruz
     })
      .subscribe({
        next: (response:string) => {
          this.message = response;
        },
        error: (err) => {
          console.error(err);
          this.message = 'Mağaza silinirken hata oluştu.';
        }
      });
  }

}
