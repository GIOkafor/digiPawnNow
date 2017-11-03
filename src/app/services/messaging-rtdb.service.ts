import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class MessagingRTDBService {

  allMessages: any;
  userMessages: any;
  uid: any;

  constructor(
  	private db: AngularFireDatabase,
  	private auth: AuthenticationService) { 
  		this.allMessages = this.db.list('all-messages').valueChanges();

  		//create reference to user portion of messages
  		this.uid = auth.getUserUid();
  		//this.userMessagesRef = this.db.list('all-messages/' + uid + '/messages', ref => ref.orderByKey().equalTo(uid)).valueChanges();
  		//this.userMessages = this.db.list('all-messages', ref => ref.orderByKey().equalTo(this.uid)).valueChanges();
  		this.userMessages = this.db.list('all-messages/'+ this.uid + '/messages').valueChanges();
  }

  getAllMessages(){
  	return this.db.list('all-mesages').valueChanges();
  }

  getUserMessages(uid){
  	var userMessages = this.db.list('all-messages/'+ uid + '/messages').valueChanges();
  	return userMessages;
  }

  createMessageThread(message){

  }

  clientSendMessage(message){
  	var msgs = this.db.list('all-messages/' + this.uid + '/messages');
  	msgs.push(message);
  }

  adminSendMessage(msg, uid){
  	var msgs = this.db.list('all-messages/' + uid + '/messages');
  	msgs.push(msg);
  }
}
