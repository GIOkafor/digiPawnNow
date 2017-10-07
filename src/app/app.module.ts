import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressSpinnerModule, MdDialogModule, MdRadioModule, MdSnackBarModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { ProductService } from './product/product.service';
import { AuthenticationService } from './auth/authentication.service';
import { OrderComponent } from './order/order.component';
import { CartService } from './cart.service';
import { OrdersService } from './dashboard/orders/orders.service';
import { PaymentService } from './services/payment.service';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { ErrorComponent } from './auth/authenticate/error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminPaymentsComponent } from './admin/admin-payments/admin-payments.component';
import { AdminMessagesComponent } from './admin/admin-messages/admin-messages.component';
import { AdminDatabaseComponent } from './admin/admin-database/admin-database.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
	{path: 'auth', component: AuthenticateComponent},

  {path: 'admin', component: AdminComponent},

  {path: 'welcome', component: HomeComponent},  

  {path: 'home', component: UserComponent, children: [
    {path: '', component: AddProductComponent},
    {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'orders', component: OrdersComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '', redirectTo: '/home/dashboard/orders', pathMatch: 'full'}
    ]},
  	{path: 'sell-item/:id', component: AddProductComponent}
  ]},

	{path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    AuthenticateComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    OrderComponent,
    DashboardComponent,
    OrdersComponent,
    SettingsComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminPaymentsComponent,
    AdminMessagesComponent,
    AdminDatabaseComponent,
    UserComponent
  ],
  entryComponents: [
  	ErrorComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdProgressSpinnerModule,
    MdDialogModule,
    MdRadioModule,
    MdSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
  	ProductService,
  	AuthenticationService,
    CartService,
    OrdersService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
