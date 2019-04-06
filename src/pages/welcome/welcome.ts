import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {  MenuController } from 'ionic-angular';
//import { Chart } from 'chart.js';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
   //userDetails : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:AuthServiceProvider,public menuCtrl: MenuController) {
	  // let userdetails=localStorage.getItem('userDetails');


  }




 logOut(){

     localStorage.clear();
     this.navCtrl.setRoot(HomePage);
 }

  }

