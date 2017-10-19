import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import * as Coinbase from 'coinbase';
import * as _ from "lodash";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  //heroku server url
  private productUrl = 'https://digipawnnow.herokuapp.com/api/product';
  private cookie = 'nxtgPubId=29; visitorId=-8718248126980238995; rvd=WlhYW11bXltdUEQfDQgdDFhUWFxZWlFeWFhZWl1bW08fDQgdDAdUWFxZWlFeWFhZWl1bW08KBx1UWE8CHg1YVAAHGgAOBwAITFtZHR9PGQANWFRbUA%3D%3D; cookieview=list; emlTgFird=true; nxtg.session=s%3AnSzD9dL2aLZN07rSPQ9nlxECLUfR07iE; ntSessInfo=1503873278832%7CnSzD9dL2aLZN07rSPQ9nlxECLUfR07iE';
  private cookie2 = '_ga=GA1.1.334540275.1501008925';
  private testUrl = 'http://localhost:3000/api/search-name';
  private testUrl2 = 'https://digipawnnow.herokuapp.com/api/search';
  private coinbaseClient = new Coinbase.Client({'apiKey': 'i5PcPrnBN90c4SGa','apiSecret': 'xn0Q5lY5fUDXP2HawOK2lAEPXeS1rmUb'});

  //barcode lookup key
  private blKey = '88axq70slu372k0tmnnjikhpg3d82h';
  //barcode lookup url by barcode
  private blURL = 'https://www.barcodelookup.com/restapi?barcode=';

  constructor(
      private http: Http) {}

  //get ("/api/product:id)
  getProduct(productId: String): Promise<void | any>{

  	return this.http.get(this.blURL + productId + '&key=' + this.blKey)
  		.toPromise()
  		.then(response => response.json())
  		.catch(this.handleError);
  }

//search by UPC using 3rd party service
  findProduct(id: string): Promise<void|any>{
    return this.http.get(this.testUrl2 + '/' + id + '&key=' + this.blKey)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

//search by UPC using 3rd party service
  findProductByName(id: string): Promise<void|any>{
    return this.http.get(this.testUrl + '/' + id)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  search(name: Observable<string>){
    return name.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term){
    return this.http.get(this.testUrl + '/' + term)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: any){
  	let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	console.error(errMsg);
  }

  getPrice(){
    
    this.coinbaseClient.getExchangeRates({'currency': 'BTC'}, function(err, rates) {
      console.log(rates);
    }); 
   
    //console.log(_.toUpper('Hello, world !'))
  }

}
