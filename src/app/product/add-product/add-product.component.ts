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

  //debug stuff
  items$: Observable<any>;
  sizeFilter$: BehaviorSubject<string|null>;
  colorFilter$: BehaviorSubject<string|null>;

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private route: ActivatedRoute,
    private afs: AngularFirestore
    ) { 
      this.productService.search(this.searchTerm)
        .subscribe(results => {
          this.results = results.result;
        });

    //unstable code start
      this.sizeFilter$ = new BehaviorSubject(null);
      this.colorFilter$ = new BehaviorSubject(null);
    /*  
      this.product = Observable.combineLatest(
        this.sizeFilter$,
        this.colorFilter$
      ).switchMap(([id, color]) => 
        afs.collection('pricing/categories/cellphones', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (id) { query = query.where('id', '==', id) };
          if (color) { query = query.where('color', '==', color) };
          return query;
        }).valueChanges()
      );
    */
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.productType = id;

    console.log("Product type is: "+this.productType);

    //check if productType is default
    if(this.productType == null)
      this.productType = 'dvd';

    this.setType(this.productType);
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

  searchDb(upc){
   this.sizeFilter$.next(upc); 
  }

  searchElectronics(item){
    this.sizeFilter$.next(item); 
  }

  searchCellPhones(item){
    this.sizeFilter$.next(item); 
  }

  searchCondition(condition){
    /*
    var url = 'pricing/categories/' + this.productType;

    this.product = this.afs.collection(url, ref => ref.where('id', '==', item).where('condition', '==', condition)).valueChanges();
    */
    this.colorFilter$.next(condition);
  }

  //debug code
  showDetails(){
    console.log("Product is: "+this.product.details.product_name);
  }

  onSubmit(val){
  	console.log(val.search);
    this.search_complete = true;

    if(this.productType == 'dvd')
  	  this.searchDb(val.search);
    else if(this.productType == 'electronics')
      this.searchElectronics(val.search);
    else if(this.productType == 'cell-phone')
      this.searchCellPhones(val.search);
  }

  getPrice(){
    this.productService.getPrice();
  }

  setType(val){
    this.productType = val;

    if(val == "electronics")
      this.setElectronics();
    else if (val == "cell-phone")
      this.setCellPhone();
    else
      this.setCd();
  }

  setElectronics(){
    this.product = Observable.combineLatest(
      this.sizeFilter$,
      this.colorFilter$
    ).switchMap(([id, condition]) => 
      this.afs.collection('pricing/categories/electronics', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (id) { query = query.where('id', '==', id) };
        if (condition) { query = query.where('condition', '==', condition) };
        return query;
      }).valueChanges()
    );
  }

  setCellPhone(){
    this.product = Observable.combineLatest(
      this.sizeFilter$,
      this.colorFilter$
    ).switchMap(([id, condition]) => 
      this.afs.collection('pricing/categories/cellphones', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (id) { query = query.where('id', '==', id) };
        if (condition) { query = query.where('condition', '==', condition) };
        return query;
      }).valueChanges()
    );
  }

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

  addToCart(item){
    this.cart.addToCart(item);

    this.searchCondition(null);

    if(this.productType == 'dvd')
      this.searchDb(null);
    else if(this.productType == 'electronics')
      this.searchElectronics(null);
    else if(this.productType == 'cell-phone')
      this.searchCellPhones(null);
  }
}
