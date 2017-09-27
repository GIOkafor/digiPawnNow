import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	user: Observable<firebase.User>;

  constructor(
  	private router: Router,
  	private afAuth: AngularFireAuth,
  	private auth: AuthenticationService) { 
  		this.user = afAuth.authState;
  }

  ngOnInit() {

  }

  redirect(){
  	this.router.navigate(['sell-item', 'dvd']);
  }

  logout(){
  	this.auth.logout();
  }
}
