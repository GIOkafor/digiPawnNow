import { Component, OnInit, Inject } from '@angular/core';
import { PricingDatabaseService } from '../services/pricing-database.service';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-admin-database',
  templateUrl: './admin-database.component.html',
  styleUrls: ['./admin-database.component.scss']
})
export class AdminDatabaseComponent implements OnInit {

	cd: any;
	cellPhones: any;
	electronics: any;

  constructor(
  	private db: PricingDatabaseService,
  	private dialog: MdDialog
  	) {
  	this.cd = db.getCdPrices();
  	this.cellPhones = db.getCellPhonePrices();
  	this.electronics = db.getElectronicsPrices();
  }

  ngOnInit() {
  }

  showDialog(item, condition, category){
  	let dialogRef = this.dialog.open(AddNewItemDialog, {
  		width: '350px',
  		data: { condition: condition }
  	});

  	dialogRef.afterClosed().subscribe(res => {
  		
  		//this only gets called if user hits the save button
  		if(res != undefined){
  			if(res[4] == true)
  				this.add(category, res);//add(category, item)
  		}
  	});

  }

  editDialog(item, category){
  	let dialogRef = this.dialog.open(EditItemDialog, {
  		width: '350px',
  		data: {item: item}
  	});

  	//add dialog closed ref action here
  	dialogRef.afterClosed().subscribe(res => {

  		if(res != undefined)
  			this.edit(category, item);
  	})
  }

  add(category, item){
  	this.db.add(category, item);
  }

  edit(category, item){
  	this.db.editCat(category, item);
  }

  delete(category, item){
  	//this.db.deleteItem(category, item);
  	this.db.showDeleteDialog(category, item);
  }
}


@Component({
  selector: 'add-new-item-dialog',
  templateUrl: 'add-new-item-dialog.html',
  styleUrls: ['add-new-item-dialog.scss']
})
export class AddNewItemDialog {

	productName: any;
	upcCode: any;
	price: any;
	condition: any;
	type: boolean = false;
	save: boolean = false;

  constructor(
    public dialogRef: MdDialogRef<AddNewItemDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { 
  		this.type = data.condition; //condition value injected by parent
  }

  close(): void {
    this.dialogRef.close();
  }

  saveItem(form){
  	this.dialogRef.close(form);
  }

}

@Component({
  selector: 'edit-item-dialog',
  templateUrl: 'edit-item-dialog.html',
  styleUrls: ['add-new-item-dialog.scss']
})
export class EditItemDialog {

	productName: any;
	upcCode: any;
	price: any;
	condition: any;
	type: boolean = false;
	save: boolean = false;
	item: any;

  constructor(
    public dialogRef: MdDialogRef<AddNewItemDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { 
  		this.item = data.item; //condition value injected by parent
  }

  close(): void {
    this.dialogRef.close();
  }

  saveItem(){
  	this.dialogRef.close(this.item);
  }

}