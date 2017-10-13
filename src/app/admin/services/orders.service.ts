import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminOrdersService {

	orders: Observable<any[]>;

  constructor(private db: AngularFirestore) { 
  	this.orders = db.collection('orders').valueChanges();
  }

  getOrders(){
  	return this.orders;
  }

}
