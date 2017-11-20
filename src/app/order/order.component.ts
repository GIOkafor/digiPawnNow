import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrdersService } from '../dashboard/orders/orders.service';
import { PaymentService } from '../services/payment.service';
import { AuthenticationService } from '../auth/authentication.service';
import { MdSnackBar, MdDialog } from '@angular/material';

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
	userPaymentInfo: any; //for checking if selected payment method exists for the user
  checkingPayments: boolean; //for signaling that selected user payments is being checked to see if it exists
  paymentDoesNotExist: boolean;
  //object for updating user bank info
  bankingInfo = {
    firstName: '',
    lastName: '',
    bank: '',
    routingNumber: '',
    accountNumber: ''
  }

  constructor(
        private cart: CartService,
  			private orders: OrdersService,
        private pay: PaymentService,
        private auth: AuthenticationService,
        private router: Router,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) { 
  	//on initialize get cart contents
  	this.cartItems = this.cart.getCart();

    //get current rates 
    this.getRates();

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

  //check if selected payment method exists before letting user place order
  checkPay(){
    this.userPaymentInfo = this.auth.getPaymentsInfo(this.currency);
    this.checkingPayments = true;
  }

  //format order object and save details to database under user uid
  createOrder(){
    var uid = this.auth.getUserUid();

    var date = new Date();
    //console.log("Date is: "+date);

    var tempVal;

    this.getRates()
      .then(_=>{
        
        if (this.currency == 'USD')
          tempVal = this.itemPrice;
        else
          tempVal = this.getConversionRate(this.currency);

        //get payment address info to be included in order details below
        //console.log(userAdress);

        //create the order details object to be uploaded to db
        var orderDetails = {
          uid: uid,
          dateCreated: date.getTime(),
          status: 'unpaid',
          orderItems: this.cartItems, 
          payment: {
            currency: this.currency,
            value: tempVal
          }
        }

        //check if user is signed in , if not redirect to auth page
        this.checkAuth()
          .then((data) => {
            //console.log(data);

            //call rest of order stuff here
            this.checkPay();
        
            //wait 3 seconds then call function
            setTimeout(()=>{
              if(this.auth.paymentInfo !== null){

                //hide loading spinner
                this.checkingPayments = false;

                this.paymentDoesNotExist = false;

                //console.log("Payment method exists, saving...");

                //save order info to database
                this.orders.createOrder(orderDetails, this.auth.paymentInfo);

                //then show success snackbar
              }
              else{
                //console.log("Payment method doesnt exist");

                //show input field for payment
                this.paymentDoesNotExist = true;

                //hide loading spinner
                this.checkingPayments = false;
              }

              //prompt for info 
              //save info and process order
            }, 3000);
          },
          (error) => {
            //console.log(error);

            var message = "You need to be signed in to place an order, redirecting ...";

            this.snackBar.open(message, '', {duration: 5000});

            this.cart.closeDialog();

            //redirect to auth page
            this.router.navigate(['auth']);
          })

        /*
          //check if payment method selected exists
          this.checkPay();
          
          //wait 3 seconds then call function
          setTimeout(()=>{
            if(this.auth.paymentInfo !== null){

              //hide loading spinner
              this.checkingPayments = false;

              this.paymentDoesNotExist = false;

              console.log("Payment method exists, saving...");

              //save order info to database
              this.orders.createOrder(orderDetails, this.auth.paymentInfo);

              //then show success snackbar
            }
            else{
              //console.log("Payment method doesnt exist");

              //show input field for payment
              this.paymentDoesNotExist = true;

              //hide loading spinner
              this.checkingPayments = false;
            }

            //prompt for info 
            //save info and process order
          }, 3000);

        */
        
        //clear rate checker function
        clearInterval(this.checkingRates);
      })

  }

  updatePayment(method, val){
    //console.log("updating payment method ", method);
    //console.log("To: ", val);
    this.auth.updatePaymentAddress(method, val)
      .then(_=> {
        this.snackBar.open('Payment method successfully updated', '', {duration: 5000});
        this.paymentDoesNotExist = false;
        this.checkingPayments = false;
      });
  }

    //update banking info
  updateBankingInfo(info){
    console.log(info);

    //not tested
    //also seperate paypal check from bank check
    //after updating user banking info create order
    this.auth.updateBankingInfo(info)
      .then(_=> this.createOrder());
  }

  //get rate in realtime 
  getRates(){
    return this.pay.getRates()
      .then(res => {
        this.rates = res;
        //console.log(this.rates);    
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

  //for hidding payment update for when user selects alternate payment method
  changePaymentStatus(){
    //console.log("Reseting payment status");
    if(this.paymentDoesNotExist == true){
      console.log("Hiding payment update form");
      this.paymentDoesNotExist = false;
    }
  }

  checkAuth(): Promise<any>{
    var uid = this.auth.getUserUid();

    return new Promise((resolve, reject) => {
      if(uid !== null){
        resolve('success');
      }else reject('error');
    });
    
  }

/*
  checkPayAsync(): Promise<any>{
    var payInfo = this.auth.paymentInfo;

    return new Promise((resolve, reject) => {
      console.log(payInfo);
      if(payInfo !== undefined){
        resolve('success');
      }else reject('error');
    });

  }
*/

}



@Component({
  selector: 'dialog-data-example-dialog',
  template: `
  <h2>Order placed successfully</h2>
  <div>Thank you for your order. You’ll receive an email with your order shipping label within the next 24hours</div>`,
})
export class OrderConfirmDialog {
  constructor() {}
}
