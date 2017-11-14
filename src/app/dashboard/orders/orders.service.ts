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

  /*
  //return particular order
  getOrder(key){
    return this.db.list('/orders', ref => ref.orderByKey().equalTo(key)).snapshotChanges();
  }
  */

  //gets a particular user's orders
  getUserOrders(){
    var uid = localStorage.getItem('currentUserUID');
    console.log("getting order for user with uid: "+ uid);
    return this.db.list('/orders/', ref => ref.orderByKey().equalTo(uid));
  }

  //mark order as paid
  markPaid(order){
    this.db.object('/orders/'+order.key).update({status: 'paid'})
      .then(_=> this.snackBar.open('Order Status Updated Successfully', '', {duration: 3000}));
  }

  //mark order as unpaid
  markUnpaid(order){
    this.db.object('/orders/'+order.key).update({status: 'unpaid'})
      .then(_=> this.snackBar.open('Order Status Updated Successfully', '', {duration: 3000}));
  }

  createOrder(orderItems, address){

    this.orders = this.db.list("/orders/");
    
    //refactored order to include payment address
    //could adjust address to result of call auth.getUserPaymentInfo here instead of inside component
    var order = {
      uid: orderItems.uid,
      dateCreated: orderItems.dateCreated,
      status: 'unpaid',
      orderItems: orderItems.orderItems, 
      payment: {
        currency: orderItems.payment.currency,
        value: orderItems.payment.value,
        paymentAddress: address 
      }
    }

    console.log(order);
    
    this.orders.push(order)
      .then(_=> {
        //clear cart contents
        this.cart.clearAll();

        //close cart dialog
        this.cart.closeDialog();

        //show notification
        this.snackBar.open('Order created successfully', '', {duration: 3000});
        this.router.navigate(['home/dashboard/orders']);
      })
      .catch(error => {
        this.snackBar.open('You need to be signed in to complete this action, redirecting ...', '', {duration: 3000});
        this.router.navigate(['auth']);
      })
  
  }

  deleteOrder(order){
    this.db.object('/orders/'+order.key).remove()
      .then(_=> this.snackBar.open('Order Deleted Successfully', '', {duration: 3000}));
  }
}
