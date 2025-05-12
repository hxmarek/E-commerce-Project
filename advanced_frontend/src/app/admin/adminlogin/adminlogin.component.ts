import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  standalone: false,
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/api/auth/admin/login', loginData)
      .subscribe({
        next: (response) => {
          const token = response.token; // API'den token böyle gelmeli
          if (token) {
            localStorage.setItem('adminToken', token);
            console.log('Login successful, token saved.');
            // İstersen login sonrası bir route'a da yönlendirebilirsin:
             this.router.navigate(['/admin/dashboard']);
          } else {
            this.errorMessage = 'Token alınamadı.';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Kullanıcı adı veya şifre hatalı!';
        }
      });
  }

}
