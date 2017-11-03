import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AuthenticationService } from '../../auth/authentication.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any;
  ordersExist: boolean = false;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;

  constructor(
    private ordersService: OrdersService,
    private db: AngularFireDatabase,
    private auth: AuthenticationService
    ) { 
    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.switchMap(uid =>
      db.list('/orders', ref => ref.orderByChild('uid').equalTo(uid)).snapshotChanges()
    );

    this.filterBy();
  }

  filterBy() {
    var uid = this.auth.getUserUid();
    this.size$.next(uid);
  }

  ngOnInit() {
  }

  test(){
  	this.ordersService.test();
  }

  getOrders(){
    console.log("Getting orders...");
  	this.orders = this.db.list('orders').valueChanges();
  }

  printShippingLabel(){

  }

  getOrder(key){
    return this.db.list('/orders', ref => ref.orderByKey().equalTo(key)).snapshotChanges();
  }

}
