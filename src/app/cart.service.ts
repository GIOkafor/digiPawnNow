import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CartService {
	
	items: any[] = [];

  constructor(private router: Router) { }


  getCart(){
  	return this.items;
  }

  addToCart(item){
  	console.log("Adding this item: " + item + " to shopping cart");
  	this.items.push(item);
  	this.redirect();
  }

  remove(item){
  	this.items.splice(item, 1)
  }

  redirect(){
  	this.router.navigate(['sell-item/order-page']);
  }
}
