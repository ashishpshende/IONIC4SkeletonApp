import { Account } from '../../../models/Account';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertController } from '@ionic/angular';

import { Globalization } from '@ionic-native/globalization/ngx';
import { SharedService } from './../../../services/shared-service/shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @BlockUI("dashboard") blockDashboardUI: NgBlockUI;  
  accounts: Array<Account>;
 
  constructor(private router: Router, 
    public alertController: AlertController,
    private globalization: Globalization,
    private sharedService:SharedService) { 

  }

  ngOnInit() {

    this.getDashboardDetails();
  }
  async presentAlert(page:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: page,
      message: 'Write code to redirect.' + page,
      buttons: ['OK']
    });

    await alert.present();
  }
  getDashboardDetails() {
    
   
  }
  goToPage1()
  {
    this.presentAlert("Page 1");
  }
  goToPage2()
  {
    this.presentAlert("Page 2");
  }
  goToPage3()
  {
    this.presentAlert("Page 3");
  }
  goToPage4()
  {
    this.presentAlert("Page 4");
  }
 
}
