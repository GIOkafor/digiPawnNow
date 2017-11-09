import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../../cart.service';
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
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: any;
  searching: boolean = false;
  search_complete: boolean = false;
  productType: string = 'empty';
  condition: string = '';
  searchTerm = new Subject<string>();
  results: Object;

  //search form
  searchForm: FormGroup;

  //debug stuff
  items$: Observable<any>;
  sizeFilter$: BehaviorSubject<string|null>;
  colorFilter$: BehaviorSubject<string|null>;

  //new search
  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;

  //newe search filters
  nameFilter: BehaviorSubject<string|null>;
  carrierFilter: BehaviorSubject<string|null>;
  payoutPrice: number;

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private fb: FormBuilder
    ) { 

    this.nameFilter = new BehaviorSubject(null);
    this.carrierFilter = new BehaviorSubject(null);

/*
    this.items = Observable.combineLatest(
      this.nameFilter,
      this.carrierFilter
    ).switchMap(([name, carrier]) => 
      afs.collection('prices/WduAXGTmStYDGEKCArdh/phones', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (name) { query = query.where('name', '==', name) };
        if (carrier) { query = query.where('carrier', '==', carrier) };
        return query;
      }).valueChanges()
    );
*/
    this.searchForm = fb.group({
      'search': ['']
    });
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.productType = id;

    console.log("Product type is: "+this.productType);

    //check if productType is default
    if(this.productType == null)
      this.productType = 'cell-phone';

    this.setType(this.productType);
  }

  filterByName(name){
    //console.log("Searching for device with name: ", name);
    this.nameFilter.next(name);
  }

  filterByCarrier(carrier){
    //console.log("Searching for carrier with name: ", carrier);
    this.carrierFilter.next(carrier);
  }

  clearFilter(){
    this.filterByName(null);
    this.filterByCarrier(null);
  }

//get product by UPC
  getProduct(prod){
  	this.searching = true;

  	this.productService.findProduct(prod)
  		.then(prod => {
  			this.product = prod.result[0];
  			this.searching = false;
  			this.showDetails();
  		})
  }

//get product by NAME
  getProductByName(prod){
    this.searching = true;

    this.productService.findProductByName(prod)
      .then(prod => {
        this.product = prod.result[0];
        this.searching = false;
        this.showDetails();
      })
  }


  searchCondition(product, condition){
    this.payoutPrice = product.prices[condition];
  }

  //triggered by clicking on name in search suggestion list
  searchByClick(id){
    this.nameFilter.next(id);
    this.search_complete = true;
    this.searchForm.reset();
  }

  //debug code
  showDetails(){
    console.log("Product is: "+this.product.details.product_name);
  }

  onSubmit(val){
  	//console.log(val);
    this.filterByName(val.search);
    this.search_complete = true;
    //this.searchForm.reset();
  /*
    this.search_complete = true;

    if(this.productType == 'dvd')
  	  this.searchDb(val.search);
    else if(this.productType == 'electronics')
      this.searchElectronics(val.search);
    else if(this.productType == 'cell-phone')
      this.searchCellPhones(val.search);
  */
  }

  getPrice(){
    this.productService.getPrice();
  }

  setType(val){
    this.productType = val;

    //reset all filters
    this.clearFilter();
    this.search_complete = false;

    if(val == "electronics")
      this.setElectronics();
    else if (val == "cell-phone")
      this.setCellPhone();

  }

  setElectronics(){
    //change query URL to match electronics portion in db
    this.items = Observable.combineLatest(
      this.nameFilter
    ).switchMap(([name]) => 
      this.afs.collection('prices/WduAXGTmStYDGEKCArdh/electronics', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (name) { query = query.where('name', '==', name) };
        return query;
      }).valueChanges()
    );
  }

  setCellPhone(){
    this.items = Observable.combineLatest(
      this.nameFilter,
      this.carrierFilter
    ).switchMap(([name, carrier]) => 
      this.afs.collection('prices/WduAXGTmStYDGEKCArdh/phones', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (name) { query = query.where('name', '==', name) };
        if (carrier) { query = query.where('carrier', '==', carrier) };
        return query;
      }).valueChanges()
    );
  }

/*
  setCd(){
    this.product = Observable.combineLatest(
      this.sizeFilter$,
      this.colorFilter$
    ).switchMap(([id, color]) => 
      this.afs.collection('pricing/categories/cd', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (id) { query = query.where('id', '==', id) };
        if (color) { query = query.where('color', '==', color) };
        return query;
      }).valueChanges()
    );
  }
*/

  addToCart(item){
    this.cart.addToCart(item);

    this.clearFilter();

    this.search_complete = false;
  }
}
