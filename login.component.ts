import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
   constructor(private fb:FormBuilder,private router:Router,private http:HttpClient){}
   loginform!:FormGroup;
   ngOnInit(): void {
     this.loginform = this.fb.group({
      email:[''],
      password:['']
     })
   }
   logindata(){
    this.http.get("http://localhost:3000/list").subscribe((res:any)=>{
      let user = res.find((a:any)=>{
       return a.email === this.loginform.value.email   && a.password === this.loginform.value.password
      })
      if(user){
        alert("login successful");
        this.loginform.reset();
        this.router.navigate(['/record']);
      }
    },
  err=>{
    alert("error");
  })
   }
}
