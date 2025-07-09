import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/files/common.service';
import { List } from 'src/app/files/list';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit{
  constructor(private fb:FormBuilder,private common:CommonService){}
  
  userlist:List = new List();
  alldata:any;
  addbtn!:boolean;
  upbtn!:boolean;
  userform!:FormGroup;
ngOnInit(): void {
  this.userform = this.fb.group({
    name:[''],
    course:[''],
    city:['']
  })
  this.getdata();
}
allbtn(){
  this.userform.reset();
  this.addbtn = true;
  this.upbtn = false;
}
getdata(){
  this.common.getmethod().subscribe((data:any)=>{
     this.alldata = data;
  })
}
postdata(){
  console.log(this.userform.value);
  this.userlist.name = this.userform.value.name;
  this.userlist.course = this.userform.value.course;
  this.userlist.city = this.userform.value.city;

  this.common.postmethod(this.userlist).subscribe((data:any)=>{
     alert("new user record add");
     this.userform.reset();
     let ref = document.getElementById('cancel')
     ref?.click();
     this.getdata();
  },
err=>{
  alert("not found error");
})
}
deletedata(id:number){
  this.common.deletemethod(id).subscribe(()=>{
    this.getdata();
  })
}
updatedata(all:any){
  this.addbtn = false;
  this.upbtn = true;
  this.userlist.id = all.id;
  this.userform.controls['name'].setValue(all.name);
  this.userform.controls['course'].setValue(all.course);
  this.userform.controls['city'].setValue(all.city);
}

editdata(){
  this.userlist.name = this.userform.value.name;
  this.userlist.course = this.userform.value.course;
  this.userlist.city = this.userform.value.city;
   
  this.common.updatemethod(this.userlist,this.userlist.id).subscribe((res:any)=>{
    alert("data is update");
    this.userform.reset();
    let ref = document.getElementById('cancel')
    ref?.click();
    this.getdata();
  },         
err=>{
  alert("data not update");
})
}
}
