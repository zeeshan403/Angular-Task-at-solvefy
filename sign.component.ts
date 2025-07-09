import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit{
constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}
sigupform!:FormGroup;
ngOnInit(): void {
  this.sigupform = this.fb.group({
    email:[''],
    password:[''],
    mobile:['']
  })
}
sigupdata(){
  this.http.post("http://localhost:3000/list",this.sigupform.value).subscribe((res:any)=>{
     alert("user has been added");
     this.sigupform.reset();
     this.router.navigate(['/login']);
  })
}
}
