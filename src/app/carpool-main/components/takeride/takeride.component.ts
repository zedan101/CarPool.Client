import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ride } from 'src/app/carpool-main/model/ride.model';
import { BookRideReq } from 'src/app/carpool-main/model/book-ride-req.model';
import { RidesService } from 'src/app/carpool-main/services/rides.service';
import { lastValueFrom } from 'rxjs';
import {timeLabel}  from 'src/assets/static-data/static-data';
import { Route, Router } from '@angular/router';

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
  timeSelectedIdx?:number;
  isDropdown=false;
  labels = timeLabel;
  isChecked = true;
  isShowAlert!:boolean;
  constructor(private rideService : RidesService, private router:Router) { }

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

  toogleRide(){
    if(this.isChecked){
      this.isChecked=false;
      this.router.navigate(['carpool/offer-ride']);
    }else{
      this.isChecked=true;
    }
    this.isChecked=true;
  }

  async getMatches(){
      this.inputData={
        from : this.takeRideForm.get('from').value,
        to : this.takeRideForm.get('to').value,
        date : this.takeRideForm.get('date').value,
        time : this.labels.findIndex(time=> time==this.takeRideForm.get('time').value)
      }
      this.rides = await lastValueFrom(this.rideService.getRides(this.inputData)); 
    
  }

  async booking(ride:Ride){
    var res =await lastValueFrom(this.rideService.booking(1,ride.rideId));
    this.takeRideForm.reset();
    this.timeSelectedIdx=undefined;
    this.rides=[];
    this.isShowAlert=true;
    setTimeout(()=>{
      this.isShowAlert=false;
    },5000); 
  }

}
