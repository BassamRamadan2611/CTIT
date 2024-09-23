import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMapComponent } from './google-map/google-map.component';
import { MatCardModule }  from '@angular/material/card'
import { ToastrModule } from 'ngx-toastr';
import { ErpModule } from './modules/erp/erp.module';




@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ErpModule,
    CoreModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatCardModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
