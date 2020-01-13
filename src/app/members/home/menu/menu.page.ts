import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  currentUser:User;
  constructor(private userService:UserService) {

   }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

}
