import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {

	messages: any[];

  constructor(
  	private msgService: MessagingService) { 
  		this.messages = msgService.getMessage();
  }

  ngOnInit() {
  }

}
