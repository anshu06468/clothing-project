import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/Ilogin';
import { SignupComponent } from '../common/signup/signup.component';
import { Observable } from 'rxjs';
import { authReturnData, AuthService } from '../services/auth-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginMode=true;
  isLoading=false;
  error:string =null;

  user = {} as User;
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  });
  btnDisabled:true
  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router, public dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
   
  }
  login(){
    if(!this.loginForm.valid){
      return;
    }
    const email=this.loginForm.value.email;
    const password=this.loginForm.value.password;
    let authObs:Observable<authReturnData>;
    // console.log(form.value);
    authObs=this.authService.logIn(email,password)
    authObs.subscribe(
      response=>{
        this.onNoClick();
      },
      errorMessage=>{
        this.error=errorMessage
      }
    )
  }


  onSignUpClick(){
    this.dialogRef.close();
    setTimeout(() => {
      const dialogRef = this.dialog.open(SignupComponent, {
        data: {}
      });
      dialogRef.afterClosed().subscribe(
        res => console.log(res)
      );
    }, 300);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
