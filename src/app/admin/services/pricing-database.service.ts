import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PricingDatabaseService {
	categoriesCollection: AngularFirestoreDocument<any>;
	categories: Observable<any[]>;
	cdCat: any;
	phoneCat: any;
	electronicCat: any;

  constructor(private db: AngularFirestore) { 
  	this.categoriesCollection = db.doc('pricing/categories');
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

  	this.phoneCat = this.categoriesCollection.collection('cellphones').snapshotChanges().map(values => {
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

	  	let obj = {id: '', price: '', condition: ''};

	  	obj.id = item[0];
	  	obj.price = item[2];
	  	obj.condition = item[3];

	  	this.categoriesCollection.collection('cellphones').add(obj);

  }

  addElectronic(item){
	  	let obj = {id: '', price: '', condition: ''};

	  	obj.id = item[0];
	  	obj.price = item[2];
	  	obj.condition = item[3];

	  	this.categoriesCollection.collection('electronics').add(obj);
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
  	console.log("item id is: "+item.id);

  	if (category == 'cd'){
  		this.categoriesCollection.collection('cd').doc(item.id).update(item.data);
  	}else if(category == 'cell-phones'){
  		this.categoriesCollection.collection('cellphones').doc(item.id).update(item.data);
  	}else if(category == 'electronics'){
  		this.categoriesCollection.collection('electronics').doc(item.id).update(item.data);
  	}
  }

  deleteItem(category, item){

  }
}
