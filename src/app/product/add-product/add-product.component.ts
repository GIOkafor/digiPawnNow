import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: any;
  searching: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  getProduct(prod){
  	this.searching = true;

  	this.productService.getProduct(prod)
  		.then(prod => {
  			this.product = prod;
  			this.searching = false;
  			this.showDetails();
  		})
  }

  //debug code
  showDetails(){
  	console.log("Product name is : "+this.product.product.itemName);
  	console.log("Product imageUrl is : "+this.product.product.imageUrl);
  	console.log("Product category is : "+this.product.category.categoryName);
  }

  onSubmit(val){
  	console.log(val.search);
  	this.getProduct(val.search);
  }

  getPrice(){
    this.productService.getPrice();
  }
}
