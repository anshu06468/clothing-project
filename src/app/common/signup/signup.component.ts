import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { authReturnData, AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    Fname: new FormControl('',[Validators.required]),
    Lname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    cpassword: new FormControl('',[Validators.required])
  });
  constructor(public dialogRef: MatDialogRef<SignupComponent>, public dialog: MatDialog,private authService:AuthService) { }

  error:string =null;

  ngOnInit() {
  }

  OnSignUp(){
    if(!this.signupForm.valid){
      return;
    }
    const fname=this.signupForm.value.Fname;
    const lname = this.signupForm.value.Lname;
    const email=this.signupForm.value.email;
    const password=this.signupForm.value.password;
    const cpassword=this.signupForm.value.cpassword;
    if(cpassword!==password){
      this.error="Password donot matched"
      return;
    }
    let authObs:Observable<authReturnData>;
    // console.log(form.value);
    authObs=this.authService.signUp(email,fname,lname,password)
    authObs.subscribe(
      response=>{
       console.log(response)
       this.onNoClick();
      },
      errorMessage=>{
        this.error=errorMessage
      }
    )

  }


  onLoginClick() {
    this.dialogRef.close();
    setTimeout(() => {
      const dialogRef = this.dialog.open(LoginComponent, {
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
