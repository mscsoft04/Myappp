import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  public reportList: any;
  public userdeatils: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:AuthServiceProvider,) {
  }

  ionViewDidLoad() {
    this.getPosts();
    this.userdeatils=JSON.parse(localStorage.getItem('userDetails')).userRole;



  }

  getPosts(){
    let url="user/message_getdata";
    this.api.GetApi(url).subscribe((data:any)=>{
        this.reportList = data;
    });
  }
}
