import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlightlistService } from 'src/app/services/flightlist.service';
import { filed } from 'src/app/models/filed.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent{
  msg:string="";
selectedfile:File={} as File;

value:File={} as File;
constructor(private flightservice:FlightlistService,private route:Router,private http:HttpClient){

}
fileselected(event:any):void{
  this.selectedfile=event.target.files[0];
 

}
uploadfile(){
  if(!this.selectedfile){
    this.msg="Select files"
   
      }

  
  
  else{
    console.log(this.selectedfile)
    this.flightservice.uploadflight(this.selectedfile).subscribe(value=>{
   
        if(value.toString()=="success"){
          console.log(value)
          this.route.navigate([""])
        }
        else if(value=="failure"){
          this.msg="Check data again"
        }
        else if(value=="Notsuccess"){
          this.msg="Select csv files"
        
        }
        else if(value=="Upload"){
          this.msg="Upload csv files only"
        }
      
    })
  }

}
/*uploadfile(file:File){
  if(this.selectedfile){
    const formdata:FormData=new FormData();
    formdata.append('file',this.selectedfile);
    this.http.post('https://localhost:7019/api/Csv',formdata).subscribe(res=>{
      console.log(res)
      
    })
  }
  else{
    this.msg="Select files"
  }
}*/
}
/*  uploadfile(){
    console.log(this.value)
    if(!this.value){
      this.msg="Select files"
    }
    else{
      console.log(this.value)
      

       

    this.flightservice.uploadflight().subscribe({
      next:(value)=>{
        if(value=="success"){
          this.route.navigate(["Flights"])
        }
        else if(value=="failure"){
          this.msg="Check your data and sql connection"
        }
        else{
          this.msg="Upload Csv files only"
        }
    }
  })
 
  }
  


  }

}*/
