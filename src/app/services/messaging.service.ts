import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessagingService {

	messageCollection: AngularFirestoreCollection<any>;
	messages: Observable<any[]>;
	messageList: any;

  constructor(
  	private afs: AngularFirestore) { 
  		this.messageCollection = afs.collection('message-list');

  		this.messages = this.messageCollection.snapshotChanges().map(msgs => {
  			return msgs.map(d => {
  				const data = d.payload.doc.data() as any;
  				const id = d.payload.doc.id;
  				return {data, id};
  			})
  		});

  		this.messageList = this.messageCollection.valueChanges();
  }


  getMessageCollections(){
  	return this.messageCollection;
  }

  getMessage(){
  	return this.messageList;
  }
}
