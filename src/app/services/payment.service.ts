import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PaymentService {

	devURL = 'http://localhost:3000/api/price';
	prodURL = 'https://digipawnnow.herokuapp.com/api/price';

  userId: string;

  constructor(
    private http: Http,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) { 
  		this.afAuth.authState.subscribe((auth) => {
        if (auth) this.userId = auth.uid
      });
  }

  getRates(){
  	return this.http.get(this.prodURL)
  		.toPromise()
  		.then(res => res.json())
  		.catch(err => this.handleError(err));
  }

  processPayment(token: any, amount: number){
    const payment = { token, amount};
    return this.db.list(`/payments/${this.userId}`).push(payment);
  }

  private handleError (error: any){
  	let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	console.error(errMsg);
  }

}
