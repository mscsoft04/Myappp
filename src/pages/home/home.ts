import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController,AlertController,LoadingController   } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WelcomePage } from '../welcome/welcome';
import { Login } from './login.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(	public navCtrl: NavController,
				public api:AuthServiceProvider ,
				private alertCtrl: AlertController,
				public loadingCtrl: LoadingController
  ){

  }
  public userData:any;
  person={uname:'super@mail.com','password':'123456'};
   logForm(form) {
	    let loading = this.loadingCtrl.create({
              content: 'Please wait...'
         });loading.present();

	let url='user/login';
	let Login ={'username': form.value.uname,
           'password': form.value.password};
    this.api.PostApi(Login,url).subscribe((data)=>{

      if(data.status==true){
		    loading.dismiss();
		  console.log(data.message);
		   this. userData = {'id':data.id,'token':data.token,'name':data.name,'userRole':data.userRole};
		   localStorage.setItem('userDetails',JSON.stringify(this.userData));
		    // debugger;
           this.navCtrl.setRoot(WelcomePage);
	   }else{
		    loading.dismiss();
		   let alert = this.alertCtrl.create({
                 //title: 'Alert',
                 subTitle: data.message,
                 buttons: [{text: 'Ok',}]
           });alert.present();
		   console.log(data.message);
	   }
   });

  }
}


