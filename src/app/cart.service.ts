import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from './order/order.component';

@Injectable()
export class CartService {
	
	items: any[] = [];
  dialogRef: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
/*
    ,
    private dialog: MdDialog */) { }


  getCart(){
  	return this.items;
  }

  addToCart(item){
  	console.log("Adding this item: " + item.details.product_name + " to shopping cart");
  	this.items.push(item);
  	this.openOrderDialog();
    //this.redirect();//change to dialog open
  }

  remove(item){
  	this.items.splice(item, 1)
  }

  clearAll(){
    this.items.length = 0;
  }

  //open order dialog(pop-up) 
  openOrderDialog(): void{
    //this.dialogRef = this.dialog.open(OrderComponent);
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

//for now redirect to hardcoded url :id
  redirect(){
    this.router.navigate(['sell-item/dvd/order-page']);
  }
}
