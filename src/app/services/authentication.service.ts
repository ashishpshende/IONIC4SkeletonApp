import { NetworkService } from './network/network.service';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { AuthorizationService } from './Authorization/authorization.service';
import { environment } from 'src/environments/environment';
const AUTH_TOKEN_KEY = 'Authorization';
const USER_LOGIN_URL = environment.apiURL +  '/users/login'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage, 
    private authroizationService:AuthorizationService,
    private platform: Platform,
     private networkService:NetworkService) {
    this.platform.ready().then(()=>
    {
      this.checkToken();
    });
  }

  login(userName: string, password: string, success: (any), failure: (any))
  {
    
    var requestParams = {"UserName":  userName,
    "Password" : password
    };
    this.networkService.post(USER_LOGIN_URL, requestParams,response=>{
     
      this.networkService.token = response["Token"];
      this.storage.set(AUTH_TOKEN_KEY, response["Token"]).then(res => {
        this.authenticationState.next(true);
        success();
      });
    },error=>{
        console.log("Error:" + error);        
        failure();
    })

  
  }
  logout()
  {
    this.storage.remove(AUTH_TOKEN_KEY).then(()=> {
      this.authenticationState.next(false);
    });
  }
  isAuthenticated()
  {
    //return true;
     return this.authenticationState.value;
  }
  checkToken()
  { 
    this.storage.get(AUTH_TOKEN_KEY).then(res => {
      
        if (res) {
          this.authenticationState.next(true);
        }

    });
  }
}
 