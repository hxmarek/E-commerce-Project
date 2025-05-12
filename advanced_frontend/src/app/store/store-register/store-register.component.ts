import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-register',
  templateUrl: './store-register.component.html',
  styleUrls: ['./store-register.component.css'],
  standalone: false
})
export class StoreRegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      storeName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // Form geçerli değilse işlemi durdur
    if (this.registerForm.invalid || this.passwordMismatch()) {
      return;
    }

    const storeData = {
      name: this.registerForm.value.storeName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.http.post('http://localhost:8080/api/auth/store/register', storeData)
      .subscribe({
        next: (response) => {
          console.log('Mağaza kaydı başarılı:', response);
          this.router.navigate(['/store/login']); // Kayıt sonrası login sayfasına yönlendir
        },
        error: (error) => {
          console.error('Kayıt hatası:', error);
          this.errorMessage = 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.';
        }
      });
  }

  passwordMismatch(): boolean {
    return this.registerForm.value.password !== this.registerForm.value.confirmPassword;
  }
}
