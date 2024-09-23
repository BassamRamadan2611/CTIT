import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTransferComponent } from './data-transfer/data-transfer.component';
import { DataTransferPackagesComponent } from './components/data-transfer-packages/data-transfer-packages.component';
import { DataTransferRouterComponent } from './components/data-transfer-router/data-transfer-router.component';
import { DataTransferAccountComponent } from './components/data-transfer-account/data-transfer-account.component';
import { DataTransferConfirmEmailComponent } from './components/data-transfer-confirm-email/data-transfer-confirm-email.component';
import { DataTransferPaymentComponent } from './components/data-transfer-payment/data-transfer-payment.component';
import { SequenceOtpGuard } from 'src/app/core/guards/sequence-otp.guard';

const routes: Routes = [
  {
    path: '',
    component: DataTransferComponent,
    children: [
      {
        path: '',
        redirectTo: 'data-transfer-packages',
        pathMatch: 'full',
      },
      {
        path: 'data-transfer-packages',
        component: DataTransferPackagesComponent,
      },
      {
        path: 'data-transfer-router',
        component: DataTransferRouterComponent,
      canActivate: [SequenceOtpGuard],
      },
      {
        path: 'data-transfer-account',
        component: DataTransferAccountComponent,
        canActivate: [SequenceOtpGuard],
      },
      {
        path: 'data-transfer-confirm-email',
        component: DataTransferConfirmEmailComponent,
       canActivate: [SequenceOtpGuard],
      },
      {
        path: 'data-transfer-payment',
        component: DataTransferPaymentComponent,
        canActivate: [SequenceOtpGuard],
      },
      {
        path: '**',
        redirectTo: 'data-transfer-packages',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTransferRoutingModule { }
