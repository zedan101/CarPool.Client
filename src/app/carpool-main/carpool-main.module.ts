import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarpoolMainRoutingModule } from './carpool-main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { OfferRideComponent } from './components/offerride/offerride.component';
import { TakeRideComponent } from './components/takeride/takeride.component';
import { RidesCardComponent } from './components/ridescard/ridescard.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { MyRidesComponent } from './components/my-rides/my-rides.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CaarpoolMainComponent } from './caarpool-main.component';


@NgModule({
  declarations: [ HomeComponent,
    OfferRideComponent,
    TakeRideComponent,
    RidesCardComponent,
    TopMenuComponent,
    MyRidesComponent,
    CaarpoolMainComponent],
  imports: [NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CarpoolMainRoutingModule
  ]
})
export class CarpoolMainModule { }
