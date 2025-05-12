import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {

  users: User[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    const token = localStorage.getItem('adminToken'); // Token'ı localStorage'dan alıyoruz
    if (!token) {
      this.errorMessage = 'Token bulunamadı. Lütfen giriş yapın.';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<User[]>('http://localhost:8080/api/auth/admin/users', { headers })
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Kullanıcılar alınamadı.';
        }
      });
  }

}
