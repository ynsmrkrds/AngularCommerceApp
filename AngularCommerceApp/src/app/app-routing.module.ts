import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProductsComponent} from './components/products/products.component';
import {AddressesComponent} from './components/addresses/addresses.component';
import {userGuard} from './guards/user.guard';
import {CreateAddressComponent} from './components/create-address/create-address.component';
import {BasketComponent} from './components/basket/basket.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {OrdersComponent} from './components/orders/orders.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [userGuard]
  },
  {
    path: "basket",
    component: BasketComponent,
    canActivate: [userGuard]
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [userGuard]
  },
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [userGuard]
  },
  {
    path: "addresses",
    component: AddressesComponent,
    canActivate: [userGuard]
  },
  {
    path: "address/create",
    component: CreateAddressComponent,
    canActivate: [userGuard]
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
