import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressSpinnerModule } from '@angular/material';

import { ProductService } from './product/product.service';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';

const routes: Routes = [
	{path: 'add-product', component: AddProductComponent},
	{path: '', redirectTo: '/add-product', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdProgressSpinnerModule
  ],
  providers: [
  	ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
