import { Injectable } from '@angular/core';
import { User } from '../interfaces/Ilogin';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface authReturnData {
  success: boolean,
  token: string,
  subscribed?:boolean
}

export interface returnUser{
  user: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
  },
  status:boolean
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
          localStorage.setItem("token",JSON.stringify(respData.token))
          // console.log(respData)
          this.handleAuthenticate().subscribe(err=>{
            console.log(err);
          });
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
          localStorage.setItem("token",JSON.stringify(respData.token))
          this.handleAuthenticate().subscribe(res=>{},err=>{
            console.log(err)
          });
        })
      )
  }

  autoLogin(){
    const token:User=JSON.parse(localStorage.getItem("token"));
    // console.log(token)
    if(!token){
      return;
    }

    if(token){
      // this.user.next(data);
      // console.log("in")
      this.handleAuthenticate().subscribe(res=>{
        let expiration_date:Date
        this.user.subscribe(data=>{
          expiration_date=data._tokenExpirationDate;
        })
        const expirationDuration=new Date(expiration_date).getTime()-new Date().getTime();
        console.log(expirationDuration)
        this.autoLogOut(expirationDuration)
        },
        err=>{
          console.log(err)
        });
    }
  }

  autoLogOut(expirationDuration:number){
    // console.log(expirationDuration)
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logOut();
    },expirationDuration)
  }

  logOut(){
    localStorage.removeItem("token");
    this.user.next(null);
    this.router.navigate(["/home"]);
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer=null;
  }


  private handleAuthenticate() {
    return this.http.post<returnUser>("https://ayushmaanbhavaa.com/api/tokenVerify",null)
                .pipe(
                    catchError(this.handleAuthError),
                    tap(respData => {
                      // console.log(respData)
                      const expirationDate = new Date(new Date().getTime() + 7*24*60*60*1000)
                      const user = new User(
                          respData.user.firstName,
                          respData.user.lastName,
                          respData.user.email,
                          expirationDate
                        );
                      this.user.next(user);
                      this.autoLogOut(7*24*3600*1000)
                    })
                )
    }

  private handleAuthError(err :HttpErrorResponse){
    let errorMessage="Error Occurred"
    if(!err.error || !err.error.message){
      return throwError(errorMessage)
    }
    else{
      return throwError(err.error.message);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    // console.log(errorRes.error.message)
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
