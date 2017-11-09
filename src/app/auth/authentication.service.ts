import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { MdDialog } from '@angular/material';
import { ErrorComponent } from './authenticate/error/error.component';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AuthenticationService {

  user: firebase.User;
  profileInfo: any;
  paymentInfo: any;

  constructor(
  	private afAuth: AngularFireAuth,
  	private db: AngularFireDatabase,
  	private router: Router,
  	public dialog: MdDialog,
    private snackBar: MdSnackBar
  	) { 
  		this.user = afAuth.auth.currentUser;
  		//this.profileInfo = db.object('/users');
  }

  emailSignUp(val){
  	this.afAuth.auth.createUserWithEmailAndPassword(val.email, val.password)
  		.then(_=> {
  			//add user info to profile

        this.profileInfo = this.db.object('/users/'+this.afAuth.auth.currentUser.uid);
  			this.profileInfo.set({userInfo: val});

        this.sendEmailVerification();

        //save user uid for later use
        var uid = this.afAuth.auth.currentUser.uid;
        localStorage.setItem('currentUserUID', uid);

  			//redirect to home page
        this.redirect();
  		})
  		.catch(err => this.handleError(err.message));
  }

  emailSignIn(email, password){
  	this.afAuth.auth.signInWithEmailAndPassword(email, password)
  		.then(_=> {
        var uid = this.afAuth.auth.currentUser.uid;
        localStorage.setItem('currentUserUID', uid);

        /*
        var userInfo;

        this.getUserInfo(uid)
          .map(info => {
            let result = [];
            if (info){
              info.forEach((arg) => {
                result.push(arg);
              })
            }

            return result;
          })
          .subscribe(res => userInfo = res);

        localStorage.setItem('userInfo', userInfo);

        */

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
  		.then(_=> {
        localStorage.removeItem('currentUserUID');
        localStorage.removeItem('userInfo');
        this.router.navigate(['/auth']);
      });
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
    var uid = localStorage.getItem('currentUserUID');

    return uid;
  }

  //searches db for user information
  getUserInfo(uid){
    return this.db.list('users/', ref => ref.orderByKey().equalTo(uid)).valueChanges();
  }

  updatePaymentSettings(val){
    var uid = this.getUserUid();
    var dbRef = this.db.object('users/' + uid + '/paymentInfo').update(val)
      .then(_=> this.snackBar.open('Successfully updated your settings', '', {duration: 3000}));
  }

  //update particular payment type
  updatePaymentAddress(method, val){
    
    var uid = this.getUserUid();

    if(method === 'USD')
      return this.db.object('users/' + uid + '/paymentInfo/').update({payPalEmail: val});//if this is false prompt user for bank information
    else if(method == 'BTC')
      return this.db.object('users/' + uid + '/paymentInfo/').update({bitcoinAddress: val});
    else if(method == 'LTC')
      return this.db.object('users/' + uid + '/paymentInfo/').update({litecoinAddress: val});
    else if(method == 'ETH')
      return this.db.object('users/' + uid + '/paymentInfo/').update({ethereumAddress: val});
  }

  //check if payment info exists, return if it does otherwise null comes back
  getPaymentsInfo(method){
    
    //console.log("Payment method is: ", method);

    var uid = this.getUserUid();

    //replace method with db destination instead
    //return this.db.object('users/' + uid + '/paymentInfo/paypal').valueChanges();

    if(method === 'USD')
      return this.db.object('users/' + uid + '/paymentInfo/payPalEmail').valueChanges()//if this is false prompt user for bank information
        .subscribe(res => {
          
          //if user doesn't have paypal get bankInfo
          if(res == null){
            return this.db.object('users/' + uid + '/paymentInfo/bankingInfo').valueChanges()
              .subscribe(result => this.paymentInfo = result);
          }else{
            //otherwise set it to paypal email
            this.paymentInfo = res;          
          }
          
        });
    else if(method == 'BTC')
      return this.db.object('users/' + uid + '/paymentInfo/bitcoinAddress').valueChanges()
        .subscribe(res => this.paymentInfo = res);
    else if(method == 'LTC')
      return this.db.object('users/' + uid + '/paymentInfo/litecoinAddress').valueChanges()
        .subscribe(res => this.paymentInfo = res);
    else if(method == 'ETH')
      return this.db.object('users/' + uid + '/paymentInfo/ethereumAddress').valueChanges()
        .subscribe(res => this.paymentInfo = res);
  }

  updateUserPassword(val){
    var currentUser = firebase.auth().currentUser;

    currentUser.updatePassword(val.password)
      .then(_=>{
        this.updateUserSettings(val);
      })
      .catch(error=>{
        console.log("Error ", error);
        this.snackBar.open(error, '', {duration: 3000});
      })
  }

  updateUserSettings(val){
    var uid = this.getUserUid();

    var dbRef = this.db.object('/users/'+ uid);
    
    //change all the values of userInfo with new val
    dbRef.set({userInfo: val})
      .then(_=> this.snackBar.open('Successfully updated your settings', '', {duration: 3000}));
  }

  updateBankingInfo(val){
    var uid = this.getUserUid();
    
    //return this so user can proceed when action is complete
    return this.db.object('/users/'+ uid + '/paymentInfo/').update({bankingInfo: val});
  }

}
