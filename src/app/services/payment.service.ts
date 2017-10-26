import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class PaymentService {

	devURL = 'http://localhost:3000/api/price';
	prodURL = 'https://digipawnnow.herokuapp.com/api/price';

  constructor(private http: Http) { 
  		
  }

  getRates(){
  	return this.http.get(this.prodURL)
  		.toPromise()
  		.then(res => res.json())
  		.catch(err => this.handleError(err));
  }

  private handleError (error: any){
  	let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	console.error(errMsg);
  }

}
