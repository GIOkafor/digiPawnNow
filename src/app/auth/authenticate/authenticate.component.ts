import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
  
  signup: boolean = false;
  user: Observable<firebase.User>;

  constructor(
  	private afAuth: AngularFireAuth,
  	private authService: AuthenticationService) { }

  ngOnInit() {
  }

  signUp(val){
  	this.authService.emailSignUp(val);
  }

  login(val){
  	this.authService.emailSignIn(val.email, val.password);
  }

  logout(){
  	this.authService.logout();
  }

  sub(val){
  	console.log("email is : "+val.email);
  	console.log("userbame is : "+val.username);
  	console.log("full name is : "+val.name);
  	console.log("phone is : "+val.phoneNumber);
  	console.log("D.O.B is : "+val.dateOfBirth);
  }
}
