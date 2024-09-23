import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErpPackagesComponent } from './components/erp-packages/erp-packages.component';
import { ErpAddsComponent } from './components/erp-adds/erp-adds.component';
import { ErpAccountComponent } from './components/erp-account/erp-account.component';
import { ErpConfirmEmailComponent } from './components/erp-confirm-email/erp-confirm-email.component';
import { ErpPaymentComponent } from './components/erp-payment/erp-payment.component';
import { ErpComponent } from './erp.component';


const routes: Routes = [
  {
    path: '',
    component: ErpComponent,
    children: [
      {
        path: '',
        redirectTo: 'erp-packages',
        pathMatch: 'full',
      },
      {
        path: 'erp-packages',
        component: ErpPackagesComponent,
      },
      {
        path: 'erp-adds',
        component: ErpAddsComponent,
      },
      {
        path: 'erp-account',
        component: ErpAccountComponent,
      },
      {
        path: 'erp-confirm-email',
        component: ErpConfirmEmailComponent,
      },
      {
        path: 'erp-payment',
        component: ErpPaymentComponent,
      },
      {
        path: '**',
        redirectTo: 'erp-packages',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpRoutingModule { }
