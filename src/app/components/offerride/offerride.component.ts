import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Ride } from 'src/app/model/ride.model';
import { RidesService } from 'src/app/services/rides.service';

@Component({
  selector: 'app-offerride',
  templateUrl: './offerride.component.html',
  styleUrls: ['./offerride.component.css']
})

export class OfferRideComponent implements OnInit {
  isNextPressed:boolean=false;
  userName!:string;
  imgLink!:string;
  labels:Array<string>=[];
  seatsLabel:Array<string>=[];
  seatSelectedIdx!:number;
  timeSelectedIdx!:number;
  generatedPrice = 180;
  isDropdown = false;
  constructor(private fb: FormBuilder,private rideService: RidesService) { }

  ngOnInit(): void {
    this.userName="Nitish";
    this.imgLink="../../../assets/images/logo.png";
    this.labels.push("5am - 9am","9am - 12pm","12pm - 3pm","3pm - 6pm","6pm - 9pm")
    this.seatsLabel.push("1","2","3")
  }
  offerRideForm: any = new FormGroup({
    from: new FormControl(''),
    to: new FormControl('', [Validators.required]),
    date: new FormControl('', [
      Validators.required,
    ]),
    time: new FormControl('',),
    seats: new FormControl('',),
    price: new FormControl('',),
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

    this.offerRideForm.controls['stops'].push(this.fb.control('',));
    
  }
  
  async offerRide(){
    console.log("ok");
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
    ride.rideId="ride";
    // RideOfferedBy:localStorage.getItem("loggedIn_user"),
    ride.rideOfferedBy="LoggedInUser";
    ride.rideTakenBy=[""];
    console.log("ok");
    var res=await lastValueFrom(this.rideService.offerRide(ride));
    console.log(res);
  }

}
