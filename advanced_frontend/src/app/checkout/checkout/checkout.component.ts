import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  shippingCost: number = 15.00;
  sameAddress: boolean = true;
  paymentMethod: string = 'creditCard';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      // Delivery Information
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      orderNote: [''],

      
    });
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });


    this.setupFormListeners();
  }

  private setupFormListeners(): void {
    this.checkoutForm.get('sameAddress')?.valueChanges.subscribe(sameAddress => {
      this.sameAddress = sameAddress;
      if (sameAddress) {
        this.copyShippingToBilling();
      }
    });
  }

  private copyShippingToBilling(): void {
    const shippingControls = ['firstName', 'lastName', 'address', 'city', 'country', 'postalCode'];
    shippingControls.forEach(control => {
      const shippingValue = this.checkoutForm.get(control)?.value;
      this.checkoutForm.get(`billing${control.charAt(0).toUpperCase() + control.slice(1)}`)?.setValue(shippingValue);
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      // Here you would typically:
      // 1. Process the payment
      // 2. Create an order
      // 3. Clear the cart
      // 4. Redirect to success page
      console.log('Form submitted:', this.checkoutForm.value);
      
      this.router.navigate(['/stripe']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
    }
  }

  setPaymentMethod(method: string): void {
    this.paymentMethod = method;
  }

  routePayment(){
    this.router.navigate(['/stripe']);
  }
}
