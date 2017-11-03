import { Component, OnInit } from '@angular/core';
import { MessagingRTDBService } from '../services/messaging-rtdb.service';
import { AuthenticationService } from '../auth/authentication.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages$: any;
  myUid: any;

  constructor(
  	private msg: MessagingRTDBService,
  	private auth: AuthenticationService) { 
  	
  		this.messages$ = msg.userMessages;
  		this.myUid = auth.getUserUid();
  }

  ngOnInit() {
  }

  sendMessage(msg){

  	var date = new Date();

  	//create message object to be sent
  	var newMsg = {
  		"from": this.myUid,
  		"message": msg.message,
  		"timeSent": date.getTime()
  	};

  	this.msg.clientSendMessage(newMsg);

  }

}
