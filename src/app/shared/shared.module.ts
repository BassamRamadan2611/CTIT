import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ProfileComponent } from './profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NewSubscriptionComponent } from './new-subscription/new-subscription.component';
import { NewAddComponent } from './new-add/new-add.component';
@NgModule({
  declarations: [FooterComponent, HeaderComponent, LoadingSpinnerComponent, ProfileComponent, EditProfileComponent, NewSubscriptionComponent, NewAddComponent],
  providers: [MessageService
  ],
  imports: [CommonModule, RouterModule, ToastrModule.forRoot(),ReactiveFormsModule ,FormsModule// ToastrModule added
  ],
  exports: [FooterComponent, HeaderComponent,LoadingSpinnerComponent,ProfileComponent,EditProfileComponent],
})
export class SharedModule {}
