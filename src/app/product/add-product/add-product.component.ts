import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../../cart.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: any;
  searching: boolean = false;
  productType: string = 'empty';
  condition: string = '';

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.productType = id;

    console.log("Product type is: "+this.productType);

    //check if productType is default
    if(this.productType == null)
      this.productType = 'dvd';
  }

  getProduct(prod){
  	this.searching = true;

  	this.productService.findProduct(prod)
  		.then(prod => {
  			this.product = prod.result[0];
  			this.searching = false;
  			this.showDetails();
  		})
  }

  //debug code
  showDetails(){
    console.log("Product is: "+this.product.details.product_name);
    //console.log("Product is: "+this.product.result.details.product_name);
  /*	
    console.log("Product name is : "+this.product.product.itemName);
  	console.log("Product imageUrl is : "+this.product.product.imageUrl);
  	console.log("Product category is : "+this.product.category.categoryName);
  */
  }

  onSubmit(val){
  	console.log(val.search);
  	this.getProduct(val.search);
  }

  getPrice(){
    this.productService.getPrice();
  }

  setType(val){
    this.productType = val;
  }

  addToCart(item){
    this.cart.addToCart(item);
  }
}
