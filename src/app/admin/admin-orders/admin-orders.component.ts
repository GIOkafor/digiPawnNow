import { Component, OnInit } from '@angular/core';
//import { AdminOrdersService } from '../services/orders.service';
import { OrdersService } from '../../dashboard/orders/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
	orders: any;
	showIndex: any;

  constructor(private ordersService: OrdersService) { 
  	this.orders = ordersService.getOrders();
  }

  ngOnInit() {
  }

//show hidden section in div
  getOrder(order){
  	//do something
  	//console.log(order);
  	this.showIndex = order;
  }

  markAsPaid(order){
    //mark 

    //apply filter so paid ones are hidden
  }

  deleteOrder(order){

  }

}
