import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Ride } from 'src/app/model/ride.model';
import { RidesService } from 'src/app/services/rides.service';
import { timeLabel,seatLabel } from 'src/assets/static-data/static-data';

@Component({
  selector: 'app-offerride',
  templateUrl: './offerride.component.html',
  styleUrls: ['./offerride.component.css']
})

export class OfferRideComponent implements OnInit {
  isNextPressed:boolean=false;
  userName!:string;
  imgLink!:string;
  seatSelectedIdx!:number;
  timeSelectedIdx!:number;
  generatedPrice = 180;
  isDropdown = false;
  labels = timeLabel;
  seatsLabel = seatLabel;
  constructor(private fb: FormBuilder,private rideService: RidesService,private router:Router) { }

  ngOnInit(): void {
    this.userName="Nitish";
    this.imgLink="../../../assets/images/logo.png";
  }
  offerRideForm: any = new FormGroup({
    from: new FormControl('',[Validators.required]),
    to: new FormControl('', [Validators.required]),
    date: new FormControl('', [
      Validators.required,
    ]),
    time: new FormControl('',[Validators.required]),
    seats: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    stops: this.fb.array([this.fb.control('',)])
  });

  setTime(time:string,index:number){
    this.timeSelectedIdx = index;
    this.offerRideForm.controls['time'].setValue(time);
  }

  setSeat(seats:string,index:number){
    this.seatSelectedIdx=index;
    this.offerRideForm.controls['seats'].setValue(seats);
    console.log(this.offerRideForm.controls['seats']);
  }

  addStops(){

    this.offerRideForm.controls['stops'].push(this.fb.control('',[Validators.required]));
    
  }
  
  async offerRide(){
    let ride = new Ride();
    let formArrVal = this.offerRideForm.get('stops').value;
    console.log(formArrVal);
    ride.location.push(this.offerRideForm.get('from').value);
    formArrVal.forEach((val: string) => {
      ride.location.push(val);
    });
    ride.location.push(this.offerRideForm.get('to').value);
    ride.date=this.offerRideForm.get('date').value;
    ride.time=this.labels.indexOf(this.offerRideForm.get('time').value);
    ride.numberOfSeatsAvailable=this.seatsLabel.indexOf(this.offerRideForm.get('seats').value)+1;
    console.log(ride.time,ride.numberOfSeatsAvailable);
    ride.price=180;
    ride.rideId="ride1";
    await lastValueFrom(this.rideService.offerRide(ride));
    this.offerRideForm.reset();
    this.router.navigate(['home']);
  }

}
