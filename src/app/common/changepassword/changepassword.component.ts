import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private route:ActivatedRoute, private fpassService: ForgotPasswordService) { }

  msg:string=null
  token:string;
  paraSubs:Subscription;
  isLoading:boolean=false;

  fPasswordForm = new FormGroup({
    pswd: new FormControl('',[Validators.required]),
    cpswd: new FormControl('',[Validators.required])
  });

  ngOnInit() {

    this.paraSubs= this.route.paramMap.pipe(
          tap(param=>{
            this.token=param.get('token')
          })
        ).subscribe();
  }

  onSumbit(){
    this.isLoading=true;
    const pswd = this.fPasswordForm.value.pswd;
    const cpswd = this.fPasswordForm.value.cpswd;
    console.log(this.token)
    if(pswd!==cpswd){
      this.msg="Password Donot Match"
      this.fPasswordForm.reset();
      return;
    }

    this.fpassService.resetPass(this.token,pswd).pipe(map(res=>{
      this.isLoading=false
      return res;
    })).subscribe(
      res=>{
        this.msg=res.message;
      },
      err=>{
        this.msg=err
      }
    );

  }

}
