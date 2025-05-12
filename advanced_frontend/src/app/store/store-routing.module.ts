import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreRegisterComponent } from './store-register/store-register.component';
import { StoreLoginComponent } from './store-login/store-login.component';
import { StoreProductsComponent } from './store-products/store-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductsComponent } from './delete-products/delete-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';

const routes: Routes = [
  { path: 'register', component: StoreRegisterComponent },
  { path: 'login', component: StoreLoginComponent },
  {path: 'storeProduct', component: StoreProductsComponent},
  {path: 'addProduct', component: AddProductComponent},
  { path: 'deleteProducts', component: DeleteProductsComponent },
  { path: 'manageOrders', component: ManageOrdersComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
