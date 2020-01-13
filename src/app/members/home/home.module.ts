
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUiLoaderComponent } from 'src/app/block-ui-loader/block-ui-loader.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule,
    BlockUIModule.forRoot({
      template: BlockUiLoaderComponent
    }) 
  ],
  declarations: [HomePage]
})
export class HomePageModule {

}
