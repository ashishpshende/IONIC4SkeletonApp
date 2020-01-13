import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SharedService } from './services/shared-service/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  appMenu=[{title:'a',url:"cyz",icon:"text"},
  {title:'b',url:"cyz",icon:"text"},
  {title:'c',url:"cyz",icon:"text"}]
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: Geolocation,
    private sharedService:SharedService,
    private authenticationService: AuthenticationService,
    private router:Router

  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.sharedService.geoLattitude =  resp.coords.latitude;
      this.sharedService.geoLongitude =  resp.coords.longitude;
    
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authenticationState.subscribe(state=>{
       
        if(state)
        {
          this.router.navigate(['dashboard', new Date().getUTCMilliseconds()]);
        }
        else
        {
            this.router.navigate(['login']);
        }
      });


    });
  }

}
