import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProductsComponent} from './components/products/products.component';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddressesComponent} from './components/addresses/addresses.component';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {TabMenuModule} from 'primeng/tabmenu';
import {CreateAddressComponent} from './components/create-address/create-address.component';
import {DataViewModule} from 'primeng/dataview';
import {BasketComponent} from './components/basket/basket.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {DropdownModule} from 'primeng/dropdown';
import {OrdersComponent} from './components/orders/orders.component';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    AddressesComponent,
    CreateAddressComponent,
    BasketComponent,
    CheckoutComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    TableModule,
    PaginatorModule,
    TabMenuModule,
    DataViewModule,
    DropdownModule,
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
