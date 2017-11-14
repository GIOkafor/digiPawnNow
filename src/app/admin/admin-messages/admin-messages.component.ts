import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessagingRTDBService } from '../../services/messaging-rtdb.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {

	messages$: any[];
  user: any;

  constructor(
  	private msgService: MessagingRTDBService,
    private router: Router,
    private auth: AuthenticationService,
    private db: AngularFireDatabase) { 
  		this.messages$ = msgService.allMessages;
  }

  ngOnInit() {
  }

  getThreadDetails(msg){
    
    var senderUID = this.findSenderUID(msg);

    //console.log("Sender uid is: ", senderUID);

    var url = '/admin/chat-details/' + senderUID;

    this.router.navigate([url]);
  }


  //loop through object and find 'from' value that isn't admin
  findSenderUID(obj){
    for (let key in obj){
      if(obj[key].from !== 'admin')
        return (obj[key].from);
    }
  }

}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(value[key]);
    }
    return keys;
  }
}

@Pipe({
  name: 'usernamePipe'
})

export class UsernameFilter implements PipeTransform{
  
  constructor(private auth: AuthenticationService){

  }

  transform(uid: any):any {

    //return item if neither filter nor list exists
    if(!uid){
      return uid;
    }

    var user = {};

    this.auth.getUserInfo(uid)
      .map(res => {
        user = res;
        return user[0].userInfo.firstName;
      })
  }
}
