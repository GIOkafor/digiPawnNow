import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ConfirmDeleteDialog } from '../admin-database/confirm-delete-dialog.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

@Injectable()
export class PricingDatabaseService {
	categoriesCollection: AngularFirestoreDocument<any>;
	categories: Observable<any[]>;
	cdCat: any;
	phoneCat: any;
	electronicCat: any;

  constructor(
  		private db: AngularFirestore,
  		private dialog: MdDialog,
  		private snackBar: MdSnackBar) { 
		  	this.categoriesCollection = db.doc('prices/WduAXGTmStYDGEKCArdh');
		  	//this.cdCat = this.categoriesCollection.collection('cd').valueChanges();
		  	//this.phoneCat = this.categoriesCollection.collection('cellphones').valueChanges();
		  	//this.electronicCat = this.categoriesCollection.collection('electronics').valueChanges();

		  	this.cdCat = this.categoriesCollection.collection('cd').snapshotChanges().map(actions => {
		      return actions.map(a => {
		        const data = a.payload.doc.data() as any;
		        const id = a.payload.doc.id;
		        return { id, data };
		      });
		    });

		  	this.phoneCat = this.categoriesCollection.collection('phones').snapshotChanges().map(values => {
		  		return values.map(a => {
		  			const data = a.payload.doc.data() as any;
		  			const id = a.payload.doc.id;
		  			return { id, data };
		  		});
		  	});

		  	this.electronicCat = this.categoriesCollection.collection('electronics').snapshotChanges().map(values => {
		  		return values.map(a => {
		  			const data = a.payload.doc.data() as any;
		  			const id = a.payload.doc.id;
		  			return { id, data };
		  		});
		  	});
  }

  getCdPrices(){
  	return this.cdCat;
  }

  getCellPhonePrices(){
  	return this.phoneCat;
  }

  getElectronicsPrices(){
  	return this.electronicCat;
  }

  addDvd(item){
	  	console.log(item);

	  	let dvd = {id: '', upc: '', price: ''};

	  	dvd.id = item[0];
	  	dvd.upc = item[1];
	  	dvd.price = item[2];

	  	this.categoriesCollection.collection('cd').add(dvd);
  }

  addCellPhone(item){
	  	console.log(item);

	  	let obj = {name: '', carrier: '', prices: '', imageUrl: ''};

	  	obj.name = item[0];
	  	obj.carrier = item[2];
	  	obj.prices = item[3];
	  	obj.imageUrl = item[4];

	  	this.db.collection('prices/WduAXGTmStYDGEKCArdh/phones').add(obj);

  }

  addElectronic(item){
	  	console.log(item);

	  	let obj = {name: '', prices: '', imageUrl: ''};

	  	obj.name = item[0];
	  	obj.prices = item[3];
	  	obj.imageUrl = item[4];

	  	this.db.collection('prices/WduAXGTmStYDGEKCArdh/electronics').add(obj);
  }

  add(category, item){
  	if (category == 'dvd'){
  		this.addDvd(item);
  	}else if(category == 'cell-phones'){
  		this.addCellPhone(item);
  	}else if(category == 'electronics'){
  		this.addElectronic(item);
  	}
  }

  editCat(category, item){
  	console.log("editing item ...");
  	console.log(item);
  	console.log("Category is: ", category);

  	if (category == 'cd'){
  		this.categoriesCollection.collection('cd').doc(item.id).update(item.data);
  	}else if(category == 'cell-phones'){
  		this.db.collection('prices/WduAXGTmStYDGEKCArdh/phones').doc(item.id).update(item.data);
  	}else if(category == 'electronics'){
  		this.db.collection('prices/WduAXGTmStYDGEKCArdh/electronics').doc(item.id).update(item.data);
  	}
  }

  deleteItem(category, item){
		if (category == 'cd'){
	  		this.categoriesCollection.collection('cd').doc(item.id).delete()
	  			.then(_=> this.snackBar.open("Item deleted successfully", "", { duration: 2000 }))
	  	}else if(category == 'cell-phones'){
	  		this.db.collection('prices/WduAXGTmStYDGEKCArdh/phones').doc(item.id).delete()
	  			.then(_=> this.snackBar.open("Item deleted successfully", "", { duration: 2000 }))
	  	}else if(category == 'electronics'){
	  		this.db.collection('prices/WduAXGTmStYDGEKCArdh/electronics').doc(item.id).delete()
	  			.then(_=> this.snackBar.open("Item deleted successfully", "", { duration: 2000 }))
	  	}
  }

  showDeleteDialog(category, item){
  		let dialogRef = this.dialog.open(ConfirmDeleteDialog, { width: '350px' });

  		dialogRef.afterClosed().subscribe(res => {

  			if (res == true)
  				this.deleteItem(category, item);
  		})
  }
}
