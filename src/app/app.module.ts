
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BlockUiLoaderComponent } from './block-ui-loader/block-ui-loader.component';
import { Toaster } from './services/tosterservice';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@NgModule({
  declarations: [AppComponent,BlockUiLoaderComponent],
  entryComponents: [BlockUiLoaderComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot(),
    HttpClientModule,
    // HttpInterceptorModule,
    
    CommonModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StatusBar,
    SplashScreen,
    File,
    WebView,
    // Transfer,
    Geolocation,
    Camera,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
