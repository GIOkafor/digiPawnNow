import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressSpinnerModule, MdDialogModule, MdRadioModule, MdSnackBarModule, MdButtonModule, MdSidenavModule, MdSelectModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { ProductService } from './product/product.service';
import { AuthenticationService } from './auth/authentication.service';
import { OrderComponent } from './order/order.component';
import { OrderConfirmDialog } from './order/order.component';
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
import { AdminOrdersService } from './admin/services/orders.service';
import { PricingDatabaseService } from './admin/services/pricing-database.service';
import { UserComponent } from './user/user.component';
import { AddNewItemDialog, EditItemDialog } from './admin/admin-database/admin-database.component';
import { ConfirmDeleteDialog } from './admin/admin-database/confirm-delete-dialog.component';
import { MessagingService } from './services/messaging.service';
import { BasicComponent } from './dashboard/settings/basic/basic.component';
import { PaymentComponent } from './dashboard/settings/payment/payment.component';
import { DisableControlDirective } from './dashboard/settings/payment/payment.component';
import { ChatComponent } from './chat/chat.component';
import { MessagingRTDBService } from './services/messaging-rtdb.service';
import { ChatDetailsComponent } from './admin/admin-messages/chat-details/chat-details.component';
import { KeysPipe } from './admin/admin-messages/admin-messages.component';
import { UsernameFilter } from './admin/admin-messages/admin-messages.component';
import { PaidFilter } from './admin/admin-orders/admin-orders.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderDetailsComponent } from './dashboard/orders/order-details/order-details.component';
import { AboutComponent } from './company-info/about/about.component';
import { ContactComponent } from './company-info/contact/contact.component';
import { HowItWorksComponent } from './company-info/how-it-works/how-it-works.component';
import { TermsAndConditionComponent } from './company-info/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './company-info/privacy-policy/privacy-policy.component';
import { AdminOrderDetailsComponent } from './admin/admin-orders/admin-order-details/admin-order-details.component';

const routes: Routes = [
	{path: 'auth', component: AuthenticateComponent},

  {path: 'admin', component: AdminComponent, children: [
    { path: 'orders', component: AdminOrdersComponent },
    { path: 'order-details/:id', component: AdminOrderDetailsComponent },
    { path: 'payments', component: AdminPaymentsComponent },
    { path: 'messages', component: AdminMessagesComponent },
    {path: 'chat-details/:id', component: ChatDetailsComponent},
    { path: 'database', component: AdminDatabaseComponent },
    { path: '', redirectTo: '/admin/orders', pathMatch: 'full'}
  ]},

  {path: 'welcome', component: HomeComponent},  

  {path: 'home', component: UserComponent, children: [
    {path: '', component: AddProductComponent},
    {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'orders', component: OrdersComponent},
      {path: 'order-details/:id', component: OrderDetailsComponent},
      {path: 'settings', component: SettingsComponent, children: [
        {path: 'basic', component: BasicComponent},
        {path: 'payment', component: PaymentComponent},
        {path: '', redirectTo: '/home/dashboard/settings/basic', pathMatch: 'full'}
      ]},
      {path: '', redirectTo: '/home/dashboard/orders', pathMatch: 'full'}
    ]},
  	{path: 'sell-item/:id', component: AddProductComponent},
    {path: 'contact', component: ChatComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact-us', component: ContactComponent},
    {path: 'how-it-works', component: HowItWorksComponent},
    {path: 'terms-and-condition', component: TermsAndConditionComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent}
  ]},

	{path: '', redirectTo: '/welcome', pathMatch: 'full'}
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
    UserComponent,
    AddNewItemDialog,
    EditItemDialog,
    ConfirmDeleteDialog,
    BasicComponent,
    PaymentComponent,
    DisableControlDirective,
    ChatComponent,
    ChatDetailsComponent,
    KeysPipe,
    PaidFilter,
    UsernameFilter,
    OrderDetailsComponent,
    OrderConfirmDialog,
    AboutComponent,
    ContactComponent,
    HowItWorksComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
    AdminOrderDetailsComponent
  ],
  entryComponents: [
  	ErrorComponent,
    OrderComponent,
    AddNewItemDialog,
    EditItemDialog,
    ConfirmDeleteDialog,
    OrderConfirmDialog
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
    MdButtonModule,
    MdSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    MdSelectModule
  ],
  providers: [
  	ProductService,
  	AuthenticationService,
    CartService,
    OrdersService,
    PaymentService,
    AdminOrdersService,
    PricingDatabaseService,
    MessagingService,
    MessagingRTDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
