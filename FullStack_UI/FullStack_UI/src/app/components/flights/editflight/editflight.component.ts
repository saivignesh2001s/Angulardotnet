import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { flight } from 'src/app/models/flights.model';
import FlightlistService from 'src/app/services/flightlist.service';

@Component({
  selector: 'app-editflight',
  templateUrl: './editflight.component.html',
  styleUrls: ['./editflight.component.css']
})

export class EditflightComponent implements OnInit{
  flightrequest: flight={
    id:'',
    flightid:'',
    dep_dest:'',
    dep_date:'',
    arr_dest:'',
    arr_date:''


  };
  msg:string="";
constructor(private route:ActivatedRoute,private flightservice:FlightlistService,private route1:Router){

}
ngOnInit(): void {
  this.route.paramMap.subscribe({
    next:(params)=>{
      const id=params.get('id');
      if(id){
        this.flightservice.getflight(id).subscribe({
          next:(flight)=>{
            console.log(flight)
            this.flightrequest=flight

          }
        })

      }
    }
  })
  
}
editflight(){
  if(this.flightrequest.arr_date>this.flightrequest.dep_date){
   this.flightservice.updateflight(this.flightrequest.id,this.flightrequest).subscribe({
    next:(flight)=>{
      this.route1.navigate(['flights'])

    },
    error:(response)=>{
      this.msg="Not updated..Check again"
    }

   })
  }
  else{
   this.msg="Departure data should not be greater than arrival date"
  }
}
}
