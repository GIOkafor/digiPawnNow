import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { OrdersService } from '../../../dashboard/orders/orders.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.scss']
})
export class AdminOrderDetailsComponent implements OnInit {

	order: any;
	orderKey: any;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
  	private db: AngularFireDatabase,
  	private ordersService: OrdersService) { }

  ngOnInit() {
  	this.orderKey = this.route.snapshot.paramMap.get('id');
  	//console.log(this.orderKey);

  	this.db.object('/orders/'+this.orderKey).snapshotChanges()
  		.subscribe(res => {
  			this.order = res;
  		});
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
    this.router.navigate(['admin/orders']);
  }

}
