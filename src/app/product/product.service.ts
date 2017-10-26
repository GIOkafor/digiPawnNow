import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as Coinbase from 'coinbase';
import { PricingDatabaseService } from '../admin/services/pricing-database.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {

  //heroku server url
  private productUrl = 'https://digipawnnow.herokuapp.com/api/product';
  private searchNameUrl = 'https://digipawnnow.herokuapp.com/api/search-name';
  private cookie = 'nxtgPubId=29; visitorId=-8718248126980238995; rvd=WlhYW11bXltdUEQfDQgdDFhUWFxZWlFeWFhZWl1bW08fDQgdDAdUWFxZWlFeWFhZWl1bW08KBx1UWE8CHg1YVAAHGgAOBwAITFtZHR9PGQANWFRbUA%3D%3D; cookieview=list; emlTgFird=true; nxtg.session=s%3AnSzD9dL2aLZN07rSPQ9nlxECLUfR07iE; ntSessInfo=1503873278832%7CnSzD9dL2aLZN07rSPQ9nlxECLUfR07iE';
  private cookie2 = '_ga=GA1.1.334540275.1501008925';
  private testUrl = 'http://localhost:3000/api/search-name';
  private testUrl2 = 'https://digipawnnow.herokuapp.com/api/search';
  private coinbaseClient = new Coinbase.Client({'apiKey': 'i5PcPrnBN90c4SGa','apiSecret': 'xn0Q5lY5fUDXP2HawOK2lAEPXeS1rmUb'});

  //barcode lookup key
  private blKey = '88axq70slu372k0tmnnjikhpg3d82h';
  //barcode lookup url by barcode
  private blURL = 'https://www.barcodelookup.com/restapi?barcode=';

  //varios categories
  private cdCollection: any;

  //debug stuff
  items$: Observable<any>;
  sizeFilter$: BehaviorSubject<string|null>;
  colorFilter$: BehaviorSubject<string|null>;

  constructor(
      private http: Http,
      private afs: AngularFirestore,
      private db: PricingDatabaseService) {
        //this.testRef = afs.collection('pricing/categories/cities');

/*
        this.testRef.add({
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000 });
        this.testRef.add({
            name: "Los Angeles", state: "CA", country: "USA",
            capital: false, population: 3900000 });
        this.testRef.add({
            name: "Washington, D.C.", state: null, country: "USA",
            capital: true, population: 680000 });
        this.testRef.add({
            name: "Tokyo", state: "null", country: "Japan",
            capital: true, population: 9000000 });
        this.testRef.add({
            name: "Beijing", state: null, country: "China",
            capital: true, population: 21500000 });
*/
  }

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
    return this.http.get(this.searchNameUrl + '/' + id)
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
    return this.http.get(this.searchNameUrl + '/' + term)
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
  }

  searchByUpc(state){
    this.sizeFilter$.next("CA"); 


    //this.testRef.where("state", "==", "CA");
    //this.afs.collection('pricing/categories/cd', ref => ref.where('upc', '==', upc)).valueChanges();
  }

  filterBySize(size: string|null) {
    this.sizeFilter$.next(size); 
  }
  filterByColor(color: string|null) {
    this.colorFilter$.next(color); 
  }

  checkAdminDbForCd(upc){
    /*
    console.log("Searching this array");
    
    console.log(this.cdCollection.length);
    console.log(this.cdCollection.find(x => x.upc === upc));
    
    let cd = this.db.getCdPrices();

    return cd[1];
    */
  }

}
