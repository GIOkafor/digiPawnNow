import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrdersService } from '../dashboard/orders/orders.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

	currency: any; //selected payment method of user
	cartItems: any;
	order: any; //cart items + selected payment method + rates
  rates: any; //exchange rates object
  itemPrice: any; //listed price for particular item (in USD) set by admin
  checkingRates: any; //variable for starting and stopping rate checking
	
  constructor(private cart: CartService,
  			private orders: OrdersService,
        private pay: PaymentService) { 
  	//on initialize get cart contents
  	this.cartItems = this.cart.getCart();

    //get current rates 
    this.getRates();

    //temporarily set item price to $1 
    //in future check list of set prices by admin
    this.getCartValue();

    //start interval loop for constantly getting values
    this.constGetRates();
  }

  ngOnInit() {
  }

  
  //for testing cart and order functionality purposes alone
  test(){
  	var tempVal;

    if (this.currency == 'USD')
          tempVal = this.itemPrice;
        else
          tempVal = this.getConversionRate(this.currency);

    var orderDetails = {
      orderItems: this.cartItems, 
      payment: {
        currency: this.currency,
        value: tempVal
      }
    }

  	for(var i = 0; i < this.cartItems.length; i++){
      console.log("Cart item is: "+this.cartItems[i].details.product_name);
    }
    
    console.log("Currency selected is: "+ orderDetails.payment.currency);
  	console.log("Currency value is: "+ orderDetails.payment.value);
  }

  getCartValue(){
    var cartTotal = 0;

    for (var i = this.cartItems.length - 1; i >= 0; i--) {
      cartTotal = cartTotal + this.cartItems[i].price;
    }

    this.itemPrice = cartTotal;
  }

  //get cart items -- not used atm because cart contents are already 
  // gotten on initialize but there just in case
  getCart(){
  	this.cartItems = this.cart.getCart();
  }

  //remove item from cart
  remove(item){
  	this.cart.remove(item);
    this.getCartValue();
  }

  //format order object and save details to database under user uid
  createOrder(){
    var tempVal;

    this.getRates()
      .then(_=>{
        
        if (this.currency == 'USD')
          tempVal = this.itemPrice;
        else
          tempVal = this.getConversionRate(this.currency);

        var orderDetails = {
          orderItems: this.cartItems, 
          payment: {
            currency: this.currency,
            value: tempVal
          }
        }

        //charge user based on selected payment via the payment service
        //then
        this.orders.createOrder(orderDetails);//save order info to database

        //then show success popup

        clearInterval(this.checkingRates);
      })
  }

  //get rate in realtime 
  getRates(){
    return this.pay.getRates()
      .then(res => {
        this.rates = res;
        console.log(this.rates);    
      })
    
  }

  //constantly check for changes to exchange rates, every 60 seconds
  constGetRates(){
    this.checkingRates = setInterval(() => this.getRates(), 60000);
  }

  //get particular conversion rate based on variable passed
  getConversionRate(curr){
    if (curr == 'BTC')
      return this.rates.BTC
    else if(curr == 'LTC')
      return this.rates.LTC
    else if(curr == 'ETH')
      return this.rates.ETH
  }

}
