import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUiLoaderComponent } from 'src/app/block-ui-loader/block-ui-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule,
    BlockUIModule.forRoot({
      template: BlockUiLoaderComponent
    }) 
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
