import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard/:cts',
        // outlet:'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }

     

    ]
  }
  ,

  {
    path: '',
    redirectTo: 'dashboard/cts:' + new Date().getUTCMilliseconds(),
    pathMatch: 'full'
  },
  // { path: 'forms/:cts', loadChildren: './forms/forms.module#FormsPageModule' },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {


}
