import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usercomments',
  standalone: false,
  templateUrl: './usercomments.component.html',
  styleUrl: './usercomments.component.css'
})
export class UsercommentsComponent {
  productId!: string | null;
  commentText: string = '';
  rating: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
  }

  selectRating(star: number): void {
    this.rating = star;
  }

  submitComment(): void {
    if (!this.commentText.trim()) {
      alert('Yorum boş olamaz.');
      return;
    }
    if (this.rating === 0) {
      alert('Lütfen bir puan verin.');
      return;
    }
  
    const token = localStorage.getItem('auth_token'); // JWT token burada tutuluyor
    if (!token) {
      alert('Giriş yapmalısınız.');
      return;
    }
  
    const url = `http://localhost:8080/api/comments/product/${this.productId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  
    const body = new URLSearchParams();
    body.set('rating', this.rating.toString());
    body.set('comment', this.commentText);
  
    this.http.post(url, body.toString(), { headers }).subscribe({
      next: () => {
        alert('Yorumunuz gönderildi.');
        this.commentText = '';
        this.rating = 0;
      },
      error: (error) => {
        console.error(error);
        alert('Yorum gönderilirken hata oluştu.');
      }
    });
  }

}
