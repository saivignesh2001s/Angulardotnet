import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  name:string="";
  password:string="";
  msg:string="";
  constructor(private route:Router){

  }
  login(){
    if(this.name=="admin@gmail.com" && this.password=="Admin@123"){
      this.route.navigate(["flights"])

    }
    else{
      this.msg="Invalid Credentials"
    }

  }

}
