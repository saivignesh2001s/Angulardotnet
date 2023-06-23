import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { flight } from '../models/flights.model';
import { filed } from '../models/filed.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FlightlistService {

  constructor(private http: HttpClient) { }
  getallflight():Observable<flight[]>{
   return this.http.get<flight[]>("https://localhost:7019/api/Flight")

  }
  addflight(flightrequest:flight):Observable<flight>{
     return this.http.post<flight>("https://localhost:7019/api/Flight",flightrequest)
  }
  getflight(id:string):Observable<flight>{
    return this.http.get<flight>("https://localhost:7019/api/Flight/"+id)
  }
  updateflight(id:string,flightrequest:flight):Observable<flight>{
    return this.http.put<flight>("https://localhost:7019/api/Flight/"+id,flightrequest)
  }
  deleteflight(id:string):Observable<boolean>{
    return this.http.delete<boolean>("https://localhost:7019/api/Flight/"+id)
  }
  uploadflight(file:File):Observable<string>{
    console.log(file)
    const formdata:FormData=new FormData();
    formdata.append('file',file)
    const headers=new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    console.log(formdata) 
    return this.http.post<string>("https://localhost:7019/api/Csv",formdata,{headers:headers})
  }
  extractflight():Observable<string>{
    return this.http.get<string>("https://localhost:7019/api/Csv")
  }
}
