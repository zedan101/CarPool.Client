import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ride } from 'src/app/model/ride.model';
import { BookRideReq } from 'src/app/model/book-ride-req.model';
import { RidesService } from 'src/app/services/rides.service';
import { lastValueFrom } from 'rxjs';
import {timeLabel}  from 'src/assets/static-data/static-data';

@Component({
  selector: 'app-takeride',
  templateUrl: './takeride.component.html',
  styleUrls: ['./takeride.component.css']
})
export class TakeRideComponent implements OnInit {
  userName!:string;
  imgLink!:string;
  inputData!:BookRideReq; 
  rides: Array<Ride>=[];
  timeSelectedIdx!:number;
  isDropdown=false;
  labels = timeLabel
  constructor(private rideService : RidesService) { }

  ngOnInit(): void {
    this.userName="Nitish";
    this.imgLink="../../../assets/images/logo.png";
  }

  takeRideForm: any = new FormGroup({
    from: new FormControl(''),
    to: new FormControl('',),
    date: new FormControl('', [
      Validators.required,
    ]),
    time: new FormControl('',)
  });


  setTime(time:string,index:number){
    this.timeSelectedIdx = index;
    this.takeRideForm.controls['time'].patchValue(time);
    
  }

  async getMatches(){
    this.inputData={
      from : this.takeRideForm.get('from').value,
      to : this.takeRideForm.get('to').value,
      date : this.takeRideForm.get('date').value,
      time : this.labels.findIndex(time=> time==this.takeRideForm.get('time').value)
    }
    this.rides = await lastValueFrom(this.rideService.getRides(this.inputData)); 
    console.log(this.rides);
  }

  async booking(ride:Ride){
    var res =await lastValueFrom(this.rideService.booking(1,ride.rideId));
    console.log(res);
  }

}
