import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompareService } from '../../services/compare.service';
import { Product } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  imports: [CommonModule]
})
export class CompareComponent implements OnInit, OnDestroy {
  comparedProducts: Product[] = [];
  private subscription!: Subscription;

  constructor(private compareService: CompareService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.compareService.compareProducts$.subscribe(products => {
      console.log('CompareComponent güncellendi:', products);
      this.comparedProducts = products;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeFromCompare(productId: number): void {
    this.compareService.removeFromCompare(productId);
  }

  clearCompare(): void {
    this.compareService.clearCompare();
  }
  goToProducts(): void {
    this.router.navigate(['/products']);
  }
} 