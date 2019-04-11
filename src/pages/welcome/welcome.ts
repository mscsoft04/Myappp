import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
//import { HomePage } from '../home/home';
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
   public postdata:any;
   public afterSucess:any;
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
     this.postdata={"user_id":userid};
    if(value=='green'){
      this.postdata.status='1';
      this.postdata.message="good";
      this.data_post( this.postdata,url);


    }else if(value=='red'){
      this.postdata.status='2';
      this.message_alert( this.postdata,url);


    }
    else if(value=='yellow'){
      this.postdata.status='3';
      this.message_alert( this.postdata,url);
   }
   // console.log(postdata);

  }
  data_post(postdata,url){

    this.api.PostApi(postdata,url).subscribe((data)=>{
      this.afterSucess=data;
      if(this.afterSucess.status==true){
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
      title: 'comments',
      inputs: [
        {
          name: 'Message',
          placeholder: 'comments'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
         /*  handler: data => {
           return false;
            console.log('Cancel clicked');
          } */
        },
        {
          text: 'Save',
          handler: data => {
            if(data.Message == "") {
              return false;

              } else {
                postdata.message=data.Message;
                this.data_post(postdata,url);
              }

          }
        }
      ]
    });
    alert.present();

 }




  }

