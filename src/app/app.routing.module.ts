import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryFormsComponent } from './components/entryforms/entryforms.component';
import { HomeComponent } from './components/home/home.component';
import { OfferRideComponent } from './components/offerride/offerride.component';
import { TakeRideComponent } from './components/takeride/takeride.component';
import { MyRidesComponent } from './components/my-rides/my-rides.component';

const routes: Routes = [
    {path:'',component:EntryFormsComponent},
    {path:'home',component:HomeComponent},
    {path: 'home/offer-ride', component:OfferRideComponent},
    {path: 'home/offer-ride/my-rides',component:MyRidesComponent},
    {path: 'home/take-ride', component:TakeRideComponent},
    {path: 'home/take-ride/my-rides',component:MyRidesComponent},
    {path:'home/my-rides',component:MyRidesComponent},

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
  })
export class AppRoutingModule { }