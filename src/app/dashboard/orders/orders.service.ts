import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../../auth/authentication.service';
import { CartService } from '../../cart.service';

@Injectable()
export class OrdersService {

  orders: any;
  userLoc: any;

  constructor(
  	private router: Router,
    private snackBar: MdSnackBar,
    private db: AngularFireDatabase,
  	private auth: AuthenticationService,
    private cart: CartService) { 
      //this.getOrders();
  }


  test(){
  	//this.auth.getUserUid();
  	this.userLoc = this.auth.getUserUid();
  	console.log(this.userLoc);
  }

//Create binding to user portion of db
  getOrders(){
  	this.orders = this.db.list(this.auth.getUserUid() + "/orders");
    //console.log(this.orders);
  }

  createOrder(orderItems){
    this.getOrders();
    this.orders.push(orderItems)
      .then(_=> {
        this.cart.clearAll();
        this.cart.closeDialog();
        this.snackBar.open('Order created successfully', '', {duration: 3000});
        this.router.navigate(['dashboard/orders']);
      });
  }
}
