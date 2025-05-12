import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private compareProducts = new BehaviorSubject<Product[]>([]);
  compareProducts$ = this.compareProducts.asObservable();
  private maxCompareItems = 3;

  constructor() {}

  addToCompare(product: Product): boolean {
    const currentProducts = this.compareProducts.value;
    
    // Check if product is already in compare list
    if (currentProducts.some(p => p.id === product.id)) {
      return false;
    }

    // Check if we've reached the maximum number of items
    if (currentProducts.length >= this.maxCompareItems) {
      return false;
    }

    const updatedProducts = [...currentProducts, product];
    this.compareProducts.next(updatedProducts);
    return true;
  }

  removeFromCompare(productId: number): void {
    const currentProducts = this.compareProducts.value;
    const updatedProducts = currentProducts.filter(p => p.id !== productId);
    this.compareProducts.next(updatedProducts);
  }

  clearCompare(): void {
    this.compareProducts.next([]);
  }

  getCompareCount(): number {
    return this.compareProducts.value.length;
  }
} 