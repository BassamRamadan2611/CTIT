import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { WorkComponent } from './components/work/work.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeroComponent } from './components/hero/hero.component';

// PrimeNG Modules
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { LandingComponent } from './landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    WorkComponent,
    PricingComponent,
    ContactComponent,
    HeroComponent,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    DropdownModule,
    SharedModule,
    LandingRoutingModule,
  ],
})
export class LandingModule {}
