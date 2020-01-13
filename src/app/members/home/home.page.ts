import { HelperService } from './../../helpers/helper-service.ts';
import { UserService } from "./../../services/user/user.service";
import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";

import { BlockUI, NgBlockUI } from "ng-block-ui";
import { MenuController } from "@ionic/angular";
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/Authorization/authorization.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit, AfterViewInit {
  
  
  tempJson: any = HelperService.EmptyJSON();
  currentUser: User;
  tab: any;
  @BlockUI("homePage") blockhomePageUI: NgBlockUI;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private authorizationService:AuthorizationService,
    private userService: UserService,
    private menu: MenuController
  ) {
    this.router.events.subscribe((event: RouterEvent) => {});
    this.tab = "Dashboard";
    this.menu.enable(true, "first");
    this.currentUser = new User(HelperService.EmptyJSON())
  }
  toggleMenu() {
    this.menu.toggle("first");
  }
  ngOnInit() {
    this.currentUser = new User(HelperService.EmptyJSON());
    this.authorizationService.currentUser = this.currentUser;
    this.getUserInfo();
  }
  ngAfterViewInit(): void {
    this.getUserInfo();
  
  }
  
  getUserInfo() {
    this.blockhomePageUI.start();
    this.authorizationService.getUseDetails(
      response => {
        this.currentUser = response;

        this.authorizationService.currentUser = this.currentUser;
        // this.
        this.blockhomePageUI.stop();
      },
      error => {
        this.blockhomePageUI.stop();
      }
    );
  }
  logout() {
    this.authenticationService.logout();
  }
  goToDashboard() {    
    this.router.navigate(["dashboard", new Date().getUTCMilliseconds()]);
  }
 
  goToForms() {
    this.router.navigate(["forms", new Date().getUTCMilliseconds()]);
  }
  goToAssignedForms() {
    this.router.navigate(["assigned-task", new Date().getUTCMilliseconds()]);
  }
  goToRecords()
  {
    this.router.navigate(["assigned-task", new Date().getUTCMilliseconds()]);
  }
  goToSubmittedByMe()
  {
    this.router.navigate(["submitted-by-me"]);
  }
}
