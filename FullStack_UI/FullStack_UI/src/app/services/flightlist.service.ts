import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { flight } from '../models/flights.model';
import { status } from '../models/status.model';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';



@Injectable({
  providedIn: 'root'
})
export default class FlightlistService {

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
  uploadflight(file:File):Observable<status>{
    console.log(file)
    const formdata:FormData=new FormData();
    formdata.append('file',file)
    const headers=new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    console.log(formdata) 
    return this.http.post<status>("https://localhost:7019/api/Csv",formdata,{headers:headers})
  }
  extractflight():Observable<status>{
    return this.http.get<status>("https://localhost:7019/api/Csv")
  }
 saveAsFile(buffer:any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }
}
