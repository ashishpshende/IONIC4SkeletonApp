import { User } from 'src/app/models/user';
import { NetworkService } from './../network/network.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedService } from '../shared-service/shared.service';
import { HelperService } from 'src/app/helpers/helper-service.ts';
import { AuthorizationService } from '../Authorization/authorization.service';
const USER_DETAIL_URL = environment.apiURL + '/users/info'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser:User;
  sampleuser: any = {
    "Id": 0,
    "Name": "OOps, Unable to fetch User Name",
    "Account": {
      "Id": 0,
      "Name": "OOps, Unable to fetch Compnay Name",
    }

  };
  constructor(
    private authorizationService:AuthorizationService,
    private networkService: NetworkService,
    private sharedService:SharedService) {

  }

  getUseDetails(success: (any), failure: (any)) {
    this.networkService.get(USER_DETAIL_URL, response => {
      this.currentUser = new User(response);   
      this.authorizationService.currentUser = this.currentUser;    
      success(this.currentUser);
    }, error => {
        success(this.sampleuser);
    })
  }
}
