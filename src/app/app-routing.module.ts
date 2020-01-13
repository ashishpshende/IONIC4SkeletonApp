import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: '', loadChildren: './members/home/home.module#HomePageModule' },
  // {
  //   path: 'invoiceDetails/:id',
  //   loadChildren: './members/home/invoice-list/invoice-details/invoice-details.module#InvoiceDetailsPageModule'
  // },
  // {
  //   path: 'purchaseDetails/:id',
  //   loadChildren: './members/home/purchases/purchase-details/purchase-details.module#PurchaseDetailsPageModule'
  // },
  // {
  //   path: 'expenseDetails/:id',
  //   loadChildren: './members/home/expenses/expense-details/expense-details.module#ExpenseDetailsPageModule'
  // },
  // {
  //   path: 'paymentDetails/:id',
  //   loadChildren: './members/home/payments/payment-details/payment-details.module#PaymentDetailsPageModule'
  // },
  //  {
  //    path: 'receiptDetails/:id',
  //   loadChildren: './members/home/receipts/receipt-details/receipt-details.module#ReceiptDetailsPageModule'
  // },


  { path: '**', redirectTo: 'dashboard', pathMatch: "full" },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
