import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CompareService } from '../../services/compare.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  compareCount: number = 0;
  isLoggedIn: boolean = false;
  user: User | null = null;
  isDropdownOpen: boolean = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private compareService: CompareService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });

    this.compareService.compareProducts$.subscribe(products => {
      this.compareCount = products.length;
    });

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      if (isAuthenticated) {
        this.authService.getUser().subscribe((user: User | null) => {
          this.user = user;
          console.log("Gelen user:", user);
        });
      } else {
        this.user = null;
      }
    });
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToCompare(): void {
    this.router.navigate(['/compare']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const userMenu = document.querySelector('.user-menu');
    const target = event.target as HTMLElement;

    if (userMenu && !userMenu.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isDropdownOpen = false;
  }
}
