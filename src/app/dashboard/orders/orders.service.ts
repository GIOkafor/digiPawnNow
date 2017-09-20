import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthenticationService } from '../../auth/authentication.service';

@Injectable()
export class OrdersService {

  orders: FirebaseListObservable<any>;
  userLoc: any;

  constructor(
  	private db: AngularFireDatabase,
  	private auth: AuthenticationService) { 
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
    this.orders.push(orderItems);
  }
}
