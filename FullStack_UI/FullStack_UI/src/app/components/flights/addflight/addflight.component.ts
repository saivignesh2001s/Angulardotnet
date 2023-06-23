import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flight } from 'src/app/models/flights.model';
import { FlightlistService } from 'src/app/services/flightlist.service';

@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit{
  flightrequest: flight={
    id:'',
    flightid:'',
    dep_dest:'',
    dep_date:'',
    arr_dest:'',
    arr_date:''


  };
  msg:string=""
  
  constructor(private flightservice:FlightlistService,private router:Router){

  }
  ngOnInit(): void {
    
  }
  AddFlight(){
    console.log(this.flightrequest);
    if(this.flightrequest.arr_date>this.flightrequest.dep_date){
      this.flightservice.addflight(this.flightrequest).subscribe({
        next:(flight)=>{
          console.log("flight")
       
          this.msg="Inserted successfully"
          this.router.navigate(['flights'])
        },
        error:(response)=>{
          console.log("response")
          this.msg="Not inserted successfully"
        }
        

      })
    }
    else{
      console.log("It can't enter")
      this.msg="Departure time cannot be longer than arrival time"
    }

  }

}
