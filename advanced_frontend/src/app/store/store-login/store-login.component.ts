import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.component.html',
  styleUrls: ['./store-login.component.css'],
  standalone:false
})
export class StoreLoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.http.post<{ token: string,storeName:string }>('http://localhost:8080/api/auth/store/login', loginData)
      .subscribe({
        next: (response) => {
          localStorage.setItem('storeName',response.storeName)
          localStorage.setItem('store_token', response.token); // Token'ı kaydet
          this.router.navigate(['/store/storeProduct']); // Başarılı girişten sonra yönlendir
        },
        error: (error) => {
          console.error('Giriş hatası:', error);
          this.errorMessage = 'Email veya şifre hatalı!';
        }
      });
  }
}
