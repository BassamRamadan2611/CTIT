import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailHostingPackagesComponent } from './components/email-hosting-packages/email-hosting-packages.component';
import { EmailHostingAddsComponent } from './components/email-hosting-adds/email-hosting-adds.component';
import { EmailHostingAccountComponent } from './components/email-hosting-account/email-hosting-account.component';
import { EmailHostingConfirmEmailComponent } from './components/email-hosting-confirm-email/email-hosting-confirm-email.component';
import { EmailHostingPaymentComponent } from './components/email-hosting-payment/email-hosting-payment.component';
import { SequenceOtpGuard } from 'src/app/core/guards/sequence-otp.guard';
import { EmailHostingComponent } from './email-hosting.component';

const routes: Routes = [
  {
    path: '',
    component: EmailHostingComponent,
    children: [
      {
        path: '',
        redirectTo: 'email-hosting-packages',
        pathMatch: 'full',
      },
      {
        path: 'email-hosting-packages',
        component: EmailHostingPackagesComponent,
      },
      {
        path: 'email-hosting-adds',
        component: EmailHostingAddsComponent,
        //canActivate: [SequenceOtpGuard],
      },
      {
        path: 'email-hosting-account',
        component: EmailHostingAccountComponent,
       // canActivate: [SequenceOtpGuard],
      },
      {
        path: 'email-hosting-confirm-email',
        component: EmailHostingConfirmEmailComponent,
        //canActivate: [SequenceOtpGuard],
      },
      {
        path: 'email-hosting-payment',
        component: EmailHostingPaymentComponent,
        //canActivate: [SequenceOtpGuard],
      },
      {
        path: '**',
        redirectTo: 'email-hosting-packages',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailHostingRoutingModule { }
