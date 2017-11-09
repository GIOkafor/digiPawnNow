import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from './order/order.component';

@Injectable()
export class CartService {
	
	items: any[] = [];
  dialogRef: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MdDialog ) { }


  getCart(){
  	return this.items;
  }

  addToCart(item){
  	//console.log("Adding this item: " + item.name + " to shopping cart");
    //console.log(item);
    var condition = item.condition;

    //prepare item object
    if(item.carrier){
      var newItem = {
        name: '',
        carrier: '',
        condition: '',
        imageUrl: '',
        price: 0
      }

      newItem.name = item.name;
      newItem.condition = item.condition;
      newItem.imageUrl = item.imageUrl;
      newItem.price = item.prices[condition];
      newItem.carrier = item.carrier;

      //console.log(newItem);


      this.items.push(newItem);
      this.openOrderDialog();
    }
    else{
      var newElectronics = {
        name: '',
        condition: '',
        imageUrl: '',
        price: 0
      }

      newElectronics.name = item.name;
      newElectronics.condition = item.condition;
      newElectronics.imageUrl = item.imageUrl;
      newElectronics.price = item.prices[condition];

      //console.log(newElectronics);


      this.items.push(newElectronics);
      this.openOrderDialog();
    }

  	//this.items.push(newItem);
  	//this.openOrderDialog();
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
    this.dialogRef = this.dialog.open(OrderComponent);
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

//for now redirect to hardcoded url :id
  redirect(){
    this.router.navigate(['sell-item/dvd/order-page']);
  }
}
