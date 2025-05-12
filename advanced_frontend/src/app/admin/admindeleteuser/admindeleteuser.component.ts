import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admindeleteuser',
  standalone: false,
  templateUrl: './admindeleteuser.component.html',
  styleUrl: './admindeleteuser.component.css'
})
export class AdmindeleteuserComponent {

  userId: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  deleteUser() {
    const token = localStorage.getItem('adminToken'); // veya token'ı nasıl saklıyorsan
    if (!token) {
      this.message = 'Token bulunamadı. Lütfen giriş yapın.';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(
      `http://localhost:8080/api/auth/admin/users/${this.userId}`, 
      {
        headers,
        responseType: 'text' // Yanıtın JSON değil düz metin olduğunu belirtiyoruz
      }
    ).subscribe({
      next: (response: string) => {
        this.message = response; // Doğrudan gelen string mesajı kullanıyoruz
        console.log('Başarılı:', response);
      },
      error: (err) => {
        console.error('Hata:', err);
        this.message = err.error || 'Bir hata oluştu';
      }
    });
  }
  
}
