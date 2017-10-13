import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from '../services/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
	orders: any;

  constructor(private ordersService: AdminOrdersService) { 
  	this.orders = ordersService.getOrders();
  }

  ngOnInit() {
  }

}
