export class Ride
{
    location:Array<string>=[];
    date!:string; 
    time!:number;
    numberOfSeatsAvailable!:number;
    price!:number;
    rideId!:string;
    rideOfferedBy!:string;
    rideTakenBy!:Array<string>;
}