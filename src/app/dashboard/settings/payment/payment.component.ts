import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../auth/authentication.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  paypal: AbstractControl;
  payPalEmail: AbstractControl;
  noPaypal: AbstractControl;
  firstName: AbstractControl;
  lastName: AbstractControl;
  bank: AbstractControl;
  routingNumber: AbstractControl;
  accountNumber: AbstractControl;
  bitcoinAddress: AbstractControl;
  litecoinAddress: AbstractControl;
  ethereumAddress: AbstractControl;

  userInfo: any;

  constructor(
  	fb: FormBuilder,
  	private auth: AuthenticationService) { 
/*
  	this.paymentForm = fb.group({
  		'paypal': [''],
  		'noPaypal': [''],
  		'payPalEmail': [''],
  		'firstName': [''],
  		'lastName': [''],
  		'bank': [''],
  		'routingNumber': [''],
  		'accountNumber': [''],
  		'bitcoinAddress': [''],
  		'litecoinAddress': [''],
  		'ethereumAddress': ['']
  	});

  	this.paypal = this.paymentForm.controls['paypal'];
  	this.noPaypal = this.paymentForm.controls['noPaypal'];
  	this.payPalEmail = this.paymentForm.controls['payPalEmail'];
  	this.firstName = this.paymentForm.controls['firstName'];
  	this.lastName = this.paymentForm.controls['lastName'];
  	this.bank = this.paymentForm.controls['bank'];
  	this.routingNumber = this.paymentForm.controls['routingNumber'];
  	this.accountNumber = this.paymentForm.controls['accountNumber'];
  	this.bitcoinAddress = this.paymentForm.controls['bitcoinAddress'];
  	this.litecoinAddress = this.paymentForm.controls['litecoinAddress'];
  	this.ethereumAddress = this.paymentForm.controls['ethereumAddress'];
*/
    var uid = localStorage.getItem('currentUserUID');
    this.userInfo = auth.getUserInfo(uid);
  }

  ngOnInit() {
  }

  updatePayments(value){
  	console.log("You submitted: ", value);

  	this.auth.updatePaymentSettings(value);
  }

}

import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}