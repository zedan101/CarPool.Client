import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Ride } from 'src/app/carpool-main/model/ride.model';
import { RidesService } from 'src/app/carpool-main/services/rides.service';
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
  seatSelectedIdx?:number;
  timeSelectedIdx?:number;
  generatedPrice = 180;
  isDropdown = false;
  labels = timeLabel;
  seatsLabel = seatLabel;
  isChecked=false;
  isShowAlert!:boolean;
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

  toogleRide(){
    if(this.isChecked){
      this.isChecked=true;
    }else{
      this.isChecked=false;
      this.router.navigate(['carpool/take-ride']);
    }
    this.isChecked=false;
  }
  

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

  minusStops(){
      this.offerRideForm.controls['stops'].removeAt(this.offerRideForm.controls['stops'].length-1);
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
    // var dateString = this.offerRideForm.get('date').value;
    // var dateParts = dateString.split("/");
    // ride.date=new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString();
    ride.date = new Date(this.offerRideForm.get('date').value);
    ride.time=this.labels.indexOf(this.offerRideForm.get('time').value);
    ride.numberOfSeatsAvailable=this.seatsLabel.indexOf(this.offerRideForm.get('seats').value)+1;
    ride.price=180;
    ride.rideId="ride5";
    await lastValueFrom(this.rideService.offerRide(ride));
    this.offerRideForm.reset();
    this.isShowAlert=true;
    this.timeSelectedIdx=undefined;
    this.seatSelectedIdx=undefined;
    setTimeout(()=>{
      this.isShowAlert=false;
    },5000); 
  }

}
