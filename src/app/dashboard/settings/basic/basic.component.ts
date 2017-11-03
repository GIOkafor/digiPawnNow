import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../auth/authentication.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

	userInfo: any;
	uid: any;

  constructor(
  	private fb: FormBuilder,
  	private auth: AuthenticationService) { 
  		this.uid = localStorage.getItem('currentUserUID');
  		this.userInfo = auth.getUserInfo(this.uid);
  }

  ngOnInit() {
  }

  updateUserSettings(val){
  	this.auth.updateUserPassword(val);//this function calls save settings on success
  }

}
