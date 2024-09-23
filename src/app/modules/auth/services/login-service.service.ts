import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'https://aldaifii.ctit.com.sa/saas/'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const requestData = { params: { email ,  password }};
    return this.http.post(`${this.apiUrl}partner_login`, requestData).pipe(
      map((response:any) => response.result),
      catchError(this.handleError)
    );
  }

  forgetPassword(email: string): Observable<any> {
    const requestData = { params: { email }};
    return this.http.post(`${this.apiUrl}forget_password`, requestData).pipe(
      map((response:any) => response.result),
      catchError(this.handleError)
    );
  }

  changePassword(params:any): Observable<any> {
    return this.http.post(`${this.apiUrl}change_password`, {params}).pipe(
      map((response:any) => response.result),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }


  getprogile_subscription_data(email:string): Observable<any> {
    const requestData = { params: { email }};
   //const params = new HttpParams().set('email', email);
    return this.http.post(`${this.apiUrl}profile_subscription_data`,requestData).pipe(
      map((response:any) => {
        console.log('Response:', response);
        return response.result;
      }),
      catchError(this.handleError)
    );
  }
    

  isLoggedIn(): boolean {
    return !!localStorage.getItem('LoginEmail');
  }

  EditProfile(params:any): Observable<any> {
   // const requestData = { params: { email,name,phone,img }};

    return this.http.post(`${this.apiUrl}edit_personal_information`,{params}).pipe(
      map((response:any) => {
        console.log('Response:', response);
        return response.result;
      }),
      catchError(this.handleError)
    );

  }
  }

