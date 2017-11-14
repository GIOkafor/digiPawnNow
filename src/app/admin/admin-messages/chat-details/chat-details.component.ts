import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { MessagingRTDBService } from '../../../services/messaging-rtdb.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss']
})
export class ChatDetailsComponent implements OnInit {

  messages: any;
  id: any;

  constructor(
  	private route: ActivatedRoute,
  	private msgService: MessagingRTDBService
  	) { }

  ngOnInit() {
  	this.id = this.route.snapshot.paramMap.get('id');
  	//console.log("Getting messages for user with uid: ", this.id);

  	this.messages = this.msgService.getUserMessages(this.id);
  }


  sendMessage(msg){

  	var date = new Date();

  	//create message object to be sent
  	var newMsg = {
  		"from": "admin",
  		"message": msg.message,
  		"timeSent": date.getTime()
  	};

  	this.msgService.adminSendMessage(newMsg, this.id);
  }
}
