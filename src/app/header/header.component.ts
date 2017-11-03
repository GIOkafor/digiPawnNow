import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { CartService } from '../cart.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	user: Observable<firebase.User>;
  cartContents: any;

  constructor(
  	private router: Router,
  	private afAuth: AngularFireAuth,
  	private auth: AuthenticationService,
    private cartService: CartService) { 
  		this.user = afAuth.authState;
      this.cartContents = cartService.items;
  }

  ngOnInit() {

  }

  redirect(){
  	this.router.navigate(['home/sell-item', 'cell-phone']);
  }

  logout(){
  	this.auth.logout();
  }

  openCart(){
    this.cartService.openOrderDialog();
  }
}
