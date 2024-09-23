import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailHostingRoutingModule } from './email-hosting-routing.module';
import { EmailHostingPackagesComponent } from './components/email-hosting-packages/email-hosting-packages.component';
import { EmailHostingAddsComponent } from './components/email-hosting-adds/email-hosting-adds.component';
import { EmailHostingAccountComponent } from './components/email-hosting-account/email-hosting-account.component';
import { EmailHostingConfirmEmailComponent } from './components/email-hosting-confirm-email/email-hosting-confirm-email.component';
import { EmailHostingPaymentComponent } from './components/email-hosting-payment/email-hosting-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { EmailHostingComponent } from './email-hosting.component';


@NgModule({
  declarations: [
    EmailHostingPackagesComponent,
    EmailHostingAddsComponent,
    EmailHostingAccountComponent,
    EmailHostingConfirmEmailComponent,
    EmailHostingPaymentComponent,
    EmailHostingComponent,

  ],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StepsModule,
    ToastModule,
    PasswordModule,
    ReactiveFormsModule,
    MessagesModule,
    DropdownModule,
    RadioButtonModule,
    EmailHostingRoutingModule

  ]
})
export class EmailHostingModule { }
