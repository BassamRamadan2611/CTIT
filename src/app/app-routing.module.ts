import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './shared/profile/profile.component';
import { authGuard } from './auth.guard';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './modules/auth/change-password/change-password.component';
import { NewSubscriptionComponent } from './shared/new-subscription/new-subscription.component';
import { NewAddComponent } from './shared/new-add/new-add.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile', component:ProfileComponent,canActivate: [authGuard]
  },
  {
    path: 'edit-profile', component:EditProfileComponent
  },
  {
    path: 'new-subs', component:NewSubscriptionComponent
  },
  {
    path: 'new-add', component:NewAddComponent
  },
  {
    path: 'change-password', component:ChangePasswordComponent
  },
  /*
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/otp/otp.module').then((m) => m.OtpModule),
  }
    ,*/
  {
    path: 'erp',
    loadChildren: () =>
      import('./modules/erp/erp.module').then((m) => m.ErpModule),
  },
  {
    path: 'data-transfer',
    loadChildren: () =>
      import('./modules/data-transfer/data-transfer.module').then((m) => m.DataTransferModule),
  },
  {
    path: 'email-hosting',
    loadChildren: () =>
      import('./modules/email-hosting/email-hosting.module').then((m) => m.EmailHostingModule),
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
