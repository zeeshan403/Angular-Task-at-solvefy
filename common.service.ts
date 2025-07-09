import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { List } from './list';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }
  getmethod(){
    return this.http.get<List>("http://localhost:3000/users").pipe(map((res:any)=>{
      return res;
    }))
  }
  postmethod(list:List){
    return this.http.post<List>("http://localhost:3000/users",list).pipe(map((res:any)=>{
      return res;
    }))
  }
  updatemethod(list:List,id:number){
    return this.http.put<List>("http://localhost:3000/users/"+id,list).pipe(map((res:any)=>{
      return res;
    }))
  }
  deletemethod(id:number){
    return this.http.delete<List>("http://localhost:3000/users/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
