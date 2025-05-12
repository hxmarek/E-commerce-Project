import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';
import { ProductsComponent } from './product/products/products.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { CartComponent } from './cart/cart/cart.component';
import { ProductDetailComponent } from './productDetail/product-detail/product-detail.component';
import { ComparisonProductComponent } from './comparison/comparison-product/comparison-product.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StripeComponent } from './stripe/stripe/stripe.component';
import { UserordersComponent } from './userorders/userorders/userorders.component';
import { UsercommentsComponent } from './usercomments/usercomments/usercomments.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProductDetailComponent,
    ComparisonProductComponent,
    CheckoutComponent,
    StripeComponent,
    UserordersComponent,
    UsercommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ])
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
