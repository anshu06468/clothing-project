import { Injectable } from '@angular/core';
import { User } from '../interfaces/Ilogin';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface authReturnData {
  success: boolean,
  token: string,
  subscribed?:boolean,
  user: {
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      role: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  user = new BehaviorSubject<User>(null);
 
  private tokenExpirationTimer:any;

  constructor(private http: HttpClient,private router:Router) { }

  signUp(email: string, firstName: string,lastName:string,password:string) {
    return this.http.post<authReturnData>("https://ayushmaanbhavaa.com/api/register",
      {
        email: email,
        password: password,
        firstName:firstName,
        lastName:lastName
        
      }).pipe
      (
        catchError(this.handleError),
        tap(respData => {
          // console.log(respData)
          this.handleAuthenticate(respData.user.email, respData.user.firstName, respData.token,respData.user.lastName,respData.user.role)
        })
        )
  }

  logIn(email: string, password: string) {
    return this.http.post<authReturnData>("https://ayushmaanbhavaa.com/api/login",
      {
        email: email,
        password: password,
      }).pipe
      (
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthenticate(respData.user.email, respData.user.firstName, respData.token,respData.user.lastName,respData.user.role)
        })
      )
  }

  autoLogin(){
    const data:User=JSON.parse(localStorage.getItem("userToken"));
    
    if(!data){
      return;
    }

    if(data){
      this.user.next(data);
      const expirationDuration=new Date(data._tokenExpirationDate).getTime()-new Date().getTime();
      console.log(expirationDuration)
      this.autoLogOut(expirationDuration)
    }
  }

  autoLogOut(expirationDuration:number){
    // console.log(expirationDuration)
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logOut();
    },expirationDuration)
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(["/home"]);
    localStorage.removeItem("userToken");
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer=null;
  }

  private handleAuthenticate(email: string, firstName: string, token: string,lastName:string,role:string) {
    const expirationDate = new Date(new Date().getTime() + 7*24*60*60*1000)
    const user = new User(
      firstName,
      lastName,
      email,
      role,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogOut(7*24*3600*1000)

    localStorage.setItem("userToken",JSON.stringify(user))
  }


  private handleError(errorRes: HttpErrorResponse) {
    // console.log(errorRes)
    let errorMessage = "An unknown error occurred";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error) {
      case "That email address is already in use.":
        errorMessage = "The email address is already in use by another account."
        break;
      case "No user found for this email address.":
        errorMessage = "There is no user found with this email address";
        break;
      case "Password Incorrect":
        errorMessage = "The password is invalid or the user does not have a password.";
        break;
    }
    return throwError(errorMessage);
  }
  
}
