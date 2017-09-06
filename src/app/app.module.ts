import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressSpinnerModule, MdDialogModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { ProductService } from './product/product.service';
import { AuthenticationService } from './auth/authentication.service';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { ErrorComponent } from './auth/authenticate/error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path: 'auth', component: AuthenticateComponent},
  {path: 'home', component: HomeComponent},
	{path: 'sell-item', component: AddProductComponent},
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
    HomeComponent
  ],
  entryComponents: [
  	ErrorComponent
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
  	ProductService,
  	AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
