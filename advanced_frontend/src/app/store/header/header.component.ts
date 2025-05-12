import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {
  @Input() storename: string ="";
  
  constructor(private router: Router) {}

  addProduct() {
    
    // Buraya modal açma vs. işlemi ekleyebilirsin

    this.router.navigate(['/store/addProduct']);
  }

  deleteProduct() {
    this.router.navigate(['/store/deleteProducts']);
  }

  logout() {
    localStorage.removeItem('store_token');
    this.router.navigate(['/store/login']);
    console.log('Logged out');
  }

  manageOrders() {
    this.router.navigate(['/store/manageOrders']);
  }

}

