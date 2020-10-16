import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  msg:string=null
  isLoading:boolean=false


  fPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
  });

  constructor(private fpassService:ForgotPasswordService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("userToken")){
      this.router.navigate(['/home'])
    }
  }

  onSumbit(){
    this.isLoading=true
    const email=this.fPasswordForm.value.email
    this.fpassService.forpassword(email).pipe(map(res=>{
      this.isLoading=false
      return res
    })).subscribe(
      resp=>{
        this.msg=resp.message
        setTimeout(()=>{
          this.router.navigate(['/home'])
        },1000)
        // this.isLoading=false
      },
      err=>{
        // this.isLoading=false
        this.msg=err
      },
    )
    // console.log(this.fPasswordForm);
  }

  

  

}
