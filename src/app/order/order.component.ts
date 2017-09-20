import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrdersService } from '../dashboard/orders/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

	currency: any;
	cartItems: any;
	order: any;
	
  constructor(private cart: CartService,
  			private orders: OrdersService) { 
  	//on initialize get cart contents
  	this.cartItems = this.cart.getCart();
  }

  ngOnInit() {
  }

  
  //for test purposes alone
  test(){
  	this.cartItems = [{itemName: 'product1'}, {itemName: 'product2'}];
  	console.log("Cart items are: "+this.cartItems);
  	console.log("Currency selected is: "+this.currency);
  }
  

  //get cart items -- not used atm because cart contents are already 
  // gotten on initialize but there just in case
  getCart(){
  	this.cartItems = this.cart.getCart();
  }

  //remove item from cart
  remove(item){
  	this.cart.remove(item);
  }

  //place order and save details tp database under user uid
  createOrder(order){
  	this.orders.createOrder(order);
  }


}
