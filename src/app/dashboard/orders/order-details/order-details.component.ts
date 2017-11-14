import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

	order: any;
	orderKey: any;

  constructor(
  	private route: ActivatedRoute,
  	private db: AngularFireDatabase
  	) { }

  ngOnInit() {
  	this.orderKey = this.route.snapshot.paramMap.get('id');
  	console.log(this.orderKey);

  	this.db.object('/orders/'+this.orderKey).snapshotChanges()
  		.subscribe(res => {
  			this.order = res;
  		});
  }

}
