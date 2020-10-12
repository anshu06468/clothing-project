import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http:HttpClient) { }

  forpassword(email:string){
    return this.http.post<{message:string}>("https://ayushmaanbhavaa.com/api/forgot_password",{email:email}).pipe(
      catchError(this.handleError)
    )
  }

  resetPass(token:string,password:string){
    return this.http.post<{message:string}>("https://ayushmaanbhavaa.com/api/reset_password/"+token,{password:password}).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes)
    let errorMessage = "An unknown error occurred";
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.message) {
      case "Please input valid Email Address":
        errorMessage = "Email not registered"
        break;
      case "Your token has expired. Please attempt to reset your password again.":
        errorMessage = "Your token has expired. Please attempt to reset your password again."
        break
        
    }
    return throwError(errorMessage);
  }
}
