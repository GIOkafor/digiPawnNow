import { Component, OnInit } from '@angular/core';
//import { AdminOrdersService } from '../services/orders.service';
import { OrdersService } from '../../dashboard/orders/orders.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
	orders: any;
	showIndex: any;
  filterArgs = '';

  constructor(
    private ordersService: OrdersService,
    private router: Router) { 
  	  //having this appear twice doesn't do shit
      this.orders = this.ordersService.getOrders();
  }

  ngOnInit() {
    this.orders = this.ordersService.getOrders();
  }

  /* Old style
  //show hidden section in div
  getOrder(order){
  	//do something
  	//console.log(order);
  	this.showIndex = order;
  }
  */

  getOrder(order){
    //console.log(order.key);

    //redirect with key in param
    this.router.navigate(['admin/order-details', order.key]);
  }

  markAsPaid(order){
    //mark 
    console.log("Marking order key: ", order.key);

    this.ordersService.markPaid(order);

    //apply filter so paid ones are hidden
  }

  markUnpaid(order){
    //mark 
    this.ordersService.markUnpaid(order);

    //apply filter so paid ones are hidden
  }

  deleteOrder(order){
    this.ordersService.deleteOrder(order);
  }

  filterByPaid(){
    this.filterArgs = 'paid';
  }

  filterByUnpaid(){
    this.filterArgs = 'unpaid';
  }

}

@Pipe({
  name: 'paidFilter',
  pure: false
})

export class PaidFilter implements PipeTransform{
  transform(items: any[], filter: any):any {

    if(!items || !filter){
      return items;
    }
    //filter items array, items which match and return true will be kept
    //false will be removed
    //filter by status property
    return items.filter(item => item.payload.val().status == filter);
 
  /*
    for(let key of items){
        console.log(key.payload.val().status);
    }
  */

  }
}
