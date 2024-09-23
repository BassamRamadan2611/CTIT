import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErpRoutingModule } from './erp-routing.module';
import { ErpComponent } from './erp.component';
import { ErpPackagesComponent } from './components/erp-packages/erp-packages.component';
import { ErpAddsComponent } from './components/erp-adds/erp-adds.component';
import { ErpAccountComponent } from './components/erp-account/erp-account.component';
import { ErpConfirmEmailComponent } from './components/erp-confirm-email/erp-confirm-email.component';
import { ErpPaymentComponent } from './components/erp-payment/erp-payment.component';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NewSubscriptionComponent } from './components/new-subscription/new-subscription.component';

@NgModule({
  declarations: [
    ErpComponent,
    ErpPackagesComponent,
    ErpAddsComponent,
    ErpAccountComponent,
    ErpConfirmEmailComponent,
    ErpPaymentComponent,
    NewSubscriptionComponent,

  ],
  providers: [MessageService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErpRoutingModule,
    StepsModule,
    ToastModule,
    PasswordModule,
    MessagesModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    
    ToastrModule.forRoot(), // ToastrModule added

    
    
    
    
  

  ]
})
export class ErpModule { }
