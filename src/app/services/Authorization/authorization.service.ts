import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { NetworkService } from '../network/network.service';
import { HelperService } from 'src/app/helpers/helper-service.ts';
import { environment } from 'src/environments/environment';
const USER_DETAIL_URL = environment.apiURL + '/users/info'
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  currentUser: User;
  constructor(private networkService: NetworkService) { 
    console.log("AuthorizationService Initialized.")
    this.currentUser = this.getStoredUser();

  }
  
  getUseDetails(success: (any), failure: (any)) {
    this.networkService.get(USER_DETAIL_URL, response => {
      this.currentUser = new User(response);
      this.storeUser(this.currentUser);
      success(this.currentUser);
     


    }, error => {
     

      success(null);
    })
  }
  storeUser(user:User)
  {
    localStorage.setItem("USER_ID",user.Id.toString());
    localStorage.setItem("USER_NAME",user.Name.toString());

   
    if(user.Account !=null && user.Account != undefined)
    {
      localStorage.setItem("ACCOUNT_ID",user.Account.Id.toString());
      localStorage.setItem("ACCOUNT_NAME",user.Account.Name.toString());
    }
   

  }
  getStoredUser()
  {
    var user:User;

    if(localStorage.getItem("USER_ID")!=null)
    {
     
      user = new User(HelperService.EmptyJSON());
      user.Id =parseInt( localStorage.getItem("USER_ID"), 10);
      user.Name = localStorage.getItem("USER_NAME");
      this.currentUser = user;
    }

    return user;
  }
}