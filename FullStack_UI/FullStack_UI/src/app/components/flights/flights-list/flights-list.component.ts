import { Component,OnInit } from '@angular/core';
import{flight} from 'src/app/models/flights.model';
import { FlightlistService } from 'src/app/services/flightlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit{
  flights:flight[]=[];
  id:string="";
  constructor(private flightservice:FlightlistService,private route:Router){}
  ngOnInit(): void {
 /*
    this.flightservice.getallflight().subscribe(data=>{
      console.log(data);
      this.flights=data;
      console.log(this.flights);
    })*/
    this.refresh();
   
    
    
  }
  refresh(){
    this.flightservice.getallflight().subscribe({
      next:(flights)=>{
        console.log(flights);
        this.flights=flights;
      },
      error:(response)=>{
        console.log(response);
      }
    })
  }
  delete(id:string){
    this.flightservice.deleteflight(id).subscribe({
      next:(flight)=>{
        console.log(flight)
        if(flight==true){
        this.refresh()
        }
      }
    })
  }
  extract(){
    this.flightservice.extractflight().subscribe(response=>{
     
        console.log(response)
      
    })
  }
  
  

}
