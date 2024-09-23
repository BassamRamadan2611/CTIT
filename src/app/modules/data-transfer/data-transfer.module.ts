import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTransferRoutingModule } from './data-transfer-routing.module';
import { DataTransferPackagesComponent } from './components/data-transfer-packages/data-transfer-packages.component';
import { DataTransferRouterComponent } from './components/data-transfer-router/data-transfer-router.component';
import { DataTransferAccountComponent } from './components/data-transfer-account/data-transfer-account.component';
import { DataTransferConfirmEmailComponent } from './components/data-transfer-confirm-email/data-transfer-confirm-email.component';
import { DataTransferPaymentComponent } from './components/data-transfer-payment/data-transfer-payment.component';
import { DataTransferGoogleMapComponent } from './components/data-transfer-google-map/data-transfer-google-map.component';
import { DataTransferComponent } from './data-transfer/data-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { ErpRoutingModule } from '../erp/erp-routing.module';
import { MessageService } from 'primeng/api';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    DataTransferPackagesComponent,
    DataTransferRouterComponent,
    DataTransferAccountComponent,
    DataTransferConfirmEmailComponent,
    DataTransferPaymentComponent,
    DataTransferGoogleMapComponent,
    DataTransferComponent,
    MapComponent
  ],
  providers: [MessageService]
  ,
  imports: [
    CommonModule,
    DataTransferRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ErpRoutingModule,
    StepsModule,
    ToastModule,
    PasswordModule,
    ReactiveFormsModule,
    MessagesModule,
    DropdownModule,
    RadioButtonModule,
  ]
})
export class DataTransferModule { }
