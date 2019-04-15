import { Component } from '@angular/core';
//import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController,AlertController,LoadingController   } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WelcomePage } from '../welcome/welcome';
import { ReportPage } from '../report/report';
import { Events } from 'ionic-angular';

//import { Login,AfterLogin} from './login.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(	public navCtrl: NavController,
				public api:AuthServiceProvider ,
				private alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public events: Events
  ){


  }
  ionViewDidLoad() {
    /* this.events.unsubscribe('admin:login');
    this.events.unsubscribe('user:login'); */

  }
  public userData:any;
  public afterLogin:any;
  person={uname:'super@mail.com','password':'123456'};
   logForm(form) {
	    let loading = this.loadingCtrl.create({
              content: 'Please wait...'
         });loading.present();

	let url='user/login';
	let Login ={'username': form.value.uname,
           'password': form.value.password};
    this.api.PostApi(Login,url).subscribe((data)=>{
      this.afterLogin=data;

      if(this.afterLogin.status==true){
		    loading.dismiss();
		  //console.log(data.message);
		   this.userData = {'id':this.afterLogin.id,'token':this.afterLogin.token,'name':this.afterLogin.name,'userRole':this.afterLogin.userRole};
       localStorage.setItem('userDetails',JSON.stringify(this.userData));
       localStorage.setItem('userRole',this.userData.userRole);
        // debugger;
        if (this.userData.userRole =='1') {
           this.navCtrl.setRoot(ReportPage);
           this.events.publish('admin:login');

        }else{
          this.navCtrl.setRoot(WelcomePage);
          this.events.publish('user:login');
        }
	   }else{
		    loading.dismiss();
		   let alert = this.alertCtrl.create({
                 //title: 'Alert',
                 subTitle: this.afterLogin.message,
                 buttons: [{text: 'Ok',}]
           });alert.present();

           //console.log(data.message);
	   }
   });

  }
}


