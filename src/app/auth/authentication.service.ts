import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { MdDialog } from '@angular/material';
import { ErrorComponent } from './authenticate/error/error.component';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  user: Observable<firebase.User>;
  profileInfo: FirebaseObjectObservable<any>;

  constructor(
  	private afAuth: AngularFireAuth,
  	private db: AngularFireDatabase,
  	private router: Router,
  	public dialog: MdDialog
  	) { 
  		this.user = afAuth.authState;
  		//this.profileInfo = db.object('/users');
  }

  emailSignUp(val){
  	this.afAuth.auth.createUserWithEmailAndPassword(val.email, val.password)
  		.then(_=> {
  			//add user info to profile
  			console.log("Created user is : " + this.afAuth.auth.currentUser.uid);

  			this.profileInfo = this.db.object('/user' + this.afAuth.auth.currentUser.uid);
  			this.profileInfo.set({userInfo: val});

  			this.redirect();
  		})
  		.catch(err => this.handleError(err.message));
  }

  emailSignIn(email, password){
  	this.afAuth.auth.signInWithEmailAndPassword(email, password)
  		.then(_=> this.redirect())
  		.catch(err => this.handleError(err.message));
  }

/*
  googleAuth(){
  	this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  facebookAuth(){
  	this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }
 */

  logout(){
  	this.afAuth.auth.signOut()
  		.then(_=> this.router.navigate(['/auth']));
  }

  redirect(){
  	this.router.navigate(['']);
  }

  handleError(errMessage){
	this.dialog.open(ErrorComponent, {
		data: errMessage,
	});
  }

  getRedirectFromProvider(){
  	this.afAuth.auth.getRedirectResult()
		.then(res => {
			if(res.credential){
				this.redirect();
			}
		})
		.catch(err => this.handleError(err.message));
  }

}
