import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  //heroku server url
  private productUrl = 'https://digipawnnow.herokuapp.com/api/product';
  private cookie = 'nxtgPubId=29; visitorId=-8718248126980238995; rvd=WlhYW11bXltdUEQfDQgdDFhUWFxZWlFeWFhZWl1bW08fDQgdDAdUWFxZWlFeWFhZWl1bW08KBx1UWE8CHg1YVAAHGgAOBwAITFtZHR9PGQANWFRbUA%3D%3D; cookieview=list; emlTgFird=true; nxtg.session=s%3AnSzD9dL2aLZN07rSPQ9nlxECLUfR07iE; ntSessInfo=1503873278832%7CnSzD9dL2aLZN07rSPQ9nlxECLUfR07iE';
  private cookie2 = '_ga=GA1.1.334540275.1501008925';
  private testUrl = 'http://localhost:3000/api/product';

  constructor(private http: Http) { }

  //get ("/api/product:id)
  getProduct(productId: String): Promise<void | any>{
  	/*
  	let header = new Headers();
  	header.append('Cookie', this.cookie2);
  	*/
	
	//{headers: header}
  	return this.http.get(this.productUrl + '/' + productId)
  		.toPromise()
  		.then(response => response.json())
  		.catch(this.handleError);
  }

  private handleError (error: any){
  	let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	console.error(errMsg);
  }
}
