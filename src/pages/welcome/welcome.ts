import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
                public navParams: NavParams,
                 public api:AuthServiceProvider,
                 public menuCtrl: MenuController,
                 private alertCtrl: AlertController,
                 public loadingCtrl: LoadingController) {
	  // let userdetails=localStorage.getItem('userDetails');


  }
  message(value){
     let user= JSON.parse(localStorage.getItem('userDetails'));
     let userid=user.id;
     let url="user/message_insertdata";
     let postdata={"user_id":userid};
    if(value=='green'){
      postdata.status='1';
      postdata.message="good";
      this.data_post(postdata,url);


    }else if(value=='red'){
      postdata.status='1';
      let message=this.message_alert(postdata,url);


    }
    else if(value=='yellow'){
      postdata.status='1';
      let message=this.message_alert(postdata,url);
   }
   // console.log(postdata);

  }
  data_post(postdata,url){

    this.api.PostApi(postdata,url).subscribe((data)=>{
      if(data.status==true){
       let alert = this.alertCtrl.create({
         //title: 'Alert',
         subTitle:"Thank You",
         buttons: [{text: 'Ok',}]
         });alert.present();
      }else{
       let alert = this.alertCtrl.create({
         //title: 'Alert',
         subTitle:"Server respone denied",
         buttons: [{text: 'Ok',}]
         });alert.present();
      }
 });
  }
 message_alert(postdata,url){

    let alert = this.alertCtrl.create({
      title: 'Message',
      inputs: [
        {
          name: 'Message',
          placeholder: 'Message'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
           return false;
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {

            postdata.message=data.Message;
            this.data_post(postdata,url);
          }
        }
      ]
    });
    alert.present();

 }




  }

