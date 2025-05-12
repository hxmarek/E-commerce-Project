import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone:false
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      console.error('Form is invalid.');
      return;
    }

    const token = localStorage.getItem('store_token');

    if (!token) {
      console.error('Token not found. User may not be logged in.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:8080/api/products', this.productForm.value, { headers })
      .subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          alert('Product added successfully!');
          this.productForm.reset();
        },
        error: (error) => {
          console.error('Error adding product:', error);
          alert('Failed to add product.');
        }
      });
  }
}
