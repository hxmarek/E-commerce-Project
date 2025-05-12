import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { ProductsComponent } from './product/products/products.component';
import { RegisterComponent } from './register/register/register.component';
import { CartComponent } from './cart/cart/cart.component';
import { ProductDetailComponent } from './productDetail/product-detail/product-detail.component';
import { CompareComponent } from './compare/compare/compare.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { StripeComponent } from './stripe/stripe/stripe.component';
import { UserordersComponent } from './userorders/userorders/userorders.component';
import { AuthGuard } from './guards/auth.guard';
import { UsercommentsComponent } from './usercomments/usercomments/usercomments.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent},
  {path: 'compare', component: CompareComponent},
  {path: 'product/:id',component: ProductDetailComponent},
  {path: 'stripe', component: StripeComponent,canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'userorders', component: UserordersComponent,canActivate: [AuthGuard]},
  {path: 'usercomments/:productId', component: UsercommentsComponent,canActivate: [AuthGuard]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
