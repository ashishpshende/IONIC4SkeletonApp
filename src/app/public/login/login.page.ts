import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  frontendValidation:boolean;
  backendValidation: boolean;
  userName:string;
  password: string;
  lurl: string = environment.apiURL;
  constructor(private authenticationService:AuthenticationService) {

    this.frontendValidation = true;
    this.backendValidation = true;
   }

  ngOnInit() {
    // this.userName = "robertj@gmail.com";
    // this.password = "Password";  // LDAP
  }
  validate() {
    if (this.userName == null || this.userName == '' || this.password == null || this.password == '')
    {
      this.frontendValidation = false;
    }
    else
    {
      this.frontendValidation = true;
    }


  }
  login()
  {
   this.backendValidation = true;
    this.validate();
    console.log("User Name: "+ this.userName);
    console.log("Password: " + this.password);
    console.log("Front End Validation: " + this.frontendValidation);
    console.log("Back End Validation: " + this.backendValidation);
     if(this.frontendValidation)
       this.authenticationService.login(this.userName,this.password,response=>{
        this.backendValidation=true;
       },
       failure=>{
         this.backendValidation = false;
       });
    
      
  }
}
