import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreProductsComponent } from './store-products/store-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductsComponent } from './delete-products/delete-products.component';
import { StoreLoginComponent } from './store-login/store-login.component';
import { StoreRegisterComponent } from './store-register/store-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';


@NgModule({
  declarations: [
    StoreProductsComponent,
    AddProductComponent,
    DeleteProductsComponent,
    StoreLoginComponent,
    StoreRegisterComponent,
    HeaderComponent,
    ManageOrdersComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreModule { }
