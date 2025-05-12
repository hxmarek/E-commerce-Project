// stripe.component.ts
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Stripe, StripeElements, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { CartItem, CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stripe',
  standalone: false,
  templateUrl: './stripe.component.html',
  styleUrl:'./stripe.component.css'
})
export class StripeComponent implements AfterViewInit , OnInit{
  stripe!: Stripe | null;
  elements!: StripeElements;
  cardElement!: StripeCardElement;
  totalPrice:number =0;
  shippingCost:number=15;
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService,private http:HttpClient,private router :Router){}



  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
  
      // Toplam fiyat hesapla
      this.totalPrice = items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    });
    this.totalPrice+=this.shippingCost;
  }

  async ngAfterViewInit() {
    this.stripe = await loadStripe('pk_test_51RGz8QGhr6ab3eYBO7kZxUNhg7Nt6y6H4tJZ5lcB133wSABOlIeSSsfh5aXlV0pPOoRmqyHunuNiZauH2SE6LpaX00m4ruB2Ee'); // Senin PUBLIC KEY’in

    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
    }
  }

  async pay() {
    if (!this.stripe || !this.cardElement) return;

    // 1️⃣ Önce kart bilgisi ile payment method oluştur
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      console.error('[HATA] Payment Method:', error.message);
      return;
    }

    console.log('[✓] Payment Method Oluştu:', paymentMethod?.id);

    // 2️⃣ Backend'den payment intent oluştur
    const res = await fetch('http://localhost:8080/api/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: (this.totalPrice+this.shippingCost)*100, paymentMethodId: paymentMethod?.id }),
    });

    const data = await res.json();

    if (data.clientSecret) {
      // 3️⃣ PaymentIntent confirm et
      const confirmResult = await this.stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod?.id,
      });

      if (confirmResult.error) {
        console.error('[HATA] Confirm:', confirmResult.error.message);
      } else {
        console.log('[✓] Ödeme Başarılı:', confirmResult.paymentIntent?.status);
        const orderPayload = {
          paymentType: 'Credit Card',
          totalAmount: this.totalPrice,
          items: this.cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
          })
        
        )

        };
  
        this.http.post('http://localhost:8080/orders', orderPayload)
          .subscribe({
            next: (response) => {
              console.log('[✓] Sipariş Başarıyla Oluşturuldu:', response);
              this.cartService.clearCart();
              this.router.navigate(['/products'])
            },
            error: (err) => {
              console.error('[HATA] Sipariş POST:', err);
            }
          });
      }
    }
  }
}
