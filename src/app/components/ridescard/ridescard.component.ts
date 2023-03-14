import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Ride } from 'src/app/model/ride.model';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import { timeLabel } from 'src/assets/static-data/static-data';

@Component({
  selector: 'app-ridescard',
  templateUrl: './ridescard.component.html',
  styleUrls: ['./ridescard.component.css']
})
export class RidesCardComponent implements OnInit {
  @Input() ride!: Ride;
  @Input() isOffer!:boolean;
  usr!:User;
  labels = timeLabel;
  constructor(private userService:UsersService) { }

  async ngOnInit(){
    if(this.isOffer){
    this.usr=await lastValueFrom(this.userService.getUsers(this.ride.rideOfferedBy))
    }
    else{
      this.usr = await lastValueFrom(this.userService.getUsers(this.ride.rideOfferedBy))  ;
    }
  }

}
