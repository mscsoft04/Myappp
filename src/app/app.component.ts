import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { ReportPage } from '../pages/report/report';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {




  /*constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }*/
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public events:Events) {
    this.initializeApp();



    this.events.subscribe('admin:login', () =>{
      console.log('admin');
      this.pages = [
        { title: 'Dashboard', component: ReportPage }
      ];
    });
    this.events.subscribe('user:login', () =>{
      console.log('user');
      this.pages = [
        { title: 'Dashboard', component: WelcomePage },
        { title: 'Feedback History', component: ReportPage }
      ];
    });



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

  }
  logOut(){

    localStorage.clear();
    this.nav.setRoot(HomePage);
}
}

