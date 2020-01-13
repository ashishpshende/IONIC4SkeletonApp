import { Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
const AUTH_TOKEN_KEY = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  authorizationToken: string;
  @BlockUI("CreateFormInstance") blockFormInstanceUI: NgBlockUI;
  headers:HttpHeaders;
  token: string;
  constructor(private http: HttpClient,private storage:Storage) {
    this.headers = new HttpHeaders();
    this.headers.set("Source", "IONIC");
    this.headers.set(AUTH_TOKEN_KEY, '');   
  }

  get(url: string,success:(any),failure:(any)) {
    this.blockFormInstanceUI.start();
    this.storage.get(AUTH_TOKEN_KEY).then(res => {
    this.token = res;

     if(this.token !=null && this.token !=undefined)
      var headers = new HttpHeaders()
        .set(AUTH_TOKEN_KEY, this.token);

      this.http.get(url, { headers })
        .subscribe(data => {
          this.blockFormInstanceUI.stop();
          success(data);
        }, error => {
            this.blockFormInstanceUI.stop();
          failure(error);
        });

    });

    
  }
  post(url:string,data:any,success:(any),failure:(any)) {
    
    this.blockFormInstanceUI.start();
    if(this.token !=null && this.token !=undefined)
    var headers = new HttpHeaders()
        .set(AUTH_TOKEN_KEY, this.token);

    this.http.post(url, data, { headers })
      .subscribe(response => {
        this.authorizationToken = response["access_token"];
        this.blockFormInstanceUI.stop();

        success(response);

      }, error => {
          failure(error);
        this.blockFormInstanceUI.stop();

      });
  }
  postFormData(url:string,data:any,success:(any),failure:(any)) {
    
    this.blockFormInstanceUI.start();
    if(this.token !=null && this.token !=undefined)
    var headers = new HttpHeaders()
    .set(AUTH_TOKEN_KEY, this.token);
    this.http.post(url, data, { headers })
      .subscribe(response => {
        this.authorizationToken = response["access_token"];
        this.blockFormInstanceUI.stop();

        success(response);

      }, error => {
          this.blockFormInstanceUI.stop();

          failure(error);
      });
  }
  patch(url: string, data: any, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    if(this.token !=null && this.token !=undefined)
    var headers = new HttpHeaders()
    .set(AUTH_TOKEN_KEY, this.token);
    this.http.patch(url, data, { headers })
      .subscribe(data => {
        this.blockFormInstanceUI.stop();
        success(data);
      }, error => {
          this.blockFormInstanceUI.stop();
        failure(error);
      });
  }

  delete(url: string, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    if(this.token !=null && this.token !=undefined)
    var headers = new HttpHeaders()
    .set(AUTH_TOKEN_KEY, this.token);

    this.http.delete(url, { headers })
      .subscribe(data => {
        this.blockFormInstanceUI.stop();
        success(data);
      }, error => {
          this.blockFormInstanceUI.stop();
        failure(error);
      });
  }

  put(url: string, data: any, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    if(this.token !=null && this.token !=undefined)
    var headers = new HttpHeaders()
    .set(AUTH_TOKEN_KEY, this.token);

    this.http.put(url, data, { headers })
      .subscribe(data => {
        this.blockFormInstanceUI.stop();
        success(data);
      }, error => {
          this.blockFormInstanceUI.stop();
        failure(error);
      });
  }
}
