import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fpassService:ForgotPasswordService) { }

  ngOnInit(): void {
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
