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

//Get all orders from db
  getOrders(){
  	return this.db.list('/orders').snapshotChanges();
  }

  //gets a particular user's orders
  getUserOrders(){
    var uid = localStorage.getItem('currentUserUID');
    console.log("getting order for user with uid: "+ uid);
    return this.db.list('/orders/', ref => ref.orderByKey().equalTo(uid));
  }

  createOrder(orderItems){

    this.orders = this.db.list("/orders/");
    
    this.orders.push(orderItems)
      .then(_=> {
        //clear cart contents
        this.cart.clearAll();

        //close cart dialog
        this.cart.closeDialog();

        //show notification
        this.snackBar.open('Order created successfully', '', {duration: 3000});
        this.router.navigate(['home/dashboard/orders']);
      });
  }
}
