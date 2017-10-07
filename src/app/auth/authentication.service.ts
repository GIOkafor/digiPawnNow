import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { MdDialog } from '@angular/material';
import { ErrorComponent } from './authenticate/error/error.component';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  user: firebase.User;
  profileInfo: any;

  constructor(
  	private afAuth: AngularFireAuth,
  	private db: AngularFireDatabase,
  	private router: Router,
  	public dialog: MdDialog
  	) { 
  		this.user = afAuth.auth.currentUser;
  		//this.profileInfo = db.object('/users');
  }

  emailSignUp(val){
  	this.afAuth.auth.createUserWithEmailAndPassword(val.email, val.password)
  		.then(_=> {
  			//add user info to profile

        this.profileInfo = this.db.object(this.afAuth.auth.currentUser.uid);
  			this.profileInfo.set({userInfo: val});

        this.sendEmailVerification();

  			//redirect to home page
        this.redirect();
  		})
  		.catch(err => this.handleError(err.message));
  }

  emailSignIn(email, password){
  	this.afAuth.auth.signInWithEmailAndPassword(email, password)
  		.then(_=> {
        this.redirect();
      })
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

 sendEmailVerification(){
   this.afAuth.auth.currentUser.sendEmailVerification()
     .then(_=> {
       console.log("Email sent successfully");
     }).catch(error => {
       console.log(error + " happened");
     });
 }

  passwordReset(email){
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(_=> {
        //TODO: add alert 
        console.log("Email sent");
      }).catch(error => {
        console.log(error);
      })
  }

  logout(){
  	this.afAuth.auth.signOut()
  		.then(_=> this.router.navigate(['/auth']));
  }

  redirect(){
  	this.router.navigate(['home/dashboard']);
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

  getUserUid(){
    //console.log(this.afAuth.auth.currentUser.uid);
    return this.afAuth.auth.currentUser.uid;
  }

}
