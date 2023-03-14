import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { AppComponent } from './app.component';
import { EntryFormsComponent } from './components/entryforms/entryforms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { OfferRideComponent } from './components/offerride/offerride.component';
import { TakeRideComponent } from './components/takeride/takeride.component';
import { RidesCardComponent } from './components/ridescard/ridescard.component';
import { AppRoutingModule } from './app.routing.module';
import { DatePipe } from '@angular/common';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MyRidesComponent } from './components/my-rides/my-rides.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    EntryFormsComponent,
    HomeComponent,
    OfferRideComponent,
    TakeRideComponent,
    RidesCardComponent,
    TopMenuComponent,
    MyRidesComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
