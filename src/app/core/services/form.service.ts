import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private baseUrl = 'https://aldaifii.ctit.com.sa/saas/';

  constructor(private http: HttpClient) {}

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

  postSubDomainValidation(subDomain: string): Observable<any> {
    const requestData = { params: { subdomain: subDomain } };
    return this.http
      .post<any>(`${this.baseUrl}check_valid_subdomain`, requestData)
      .pipe(
        map((response) => response.result),
        catchError(this.handleError)
      );
  }

  postEmailVerification(params:any): Observable<any> {

   // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.baseUrl}action_register`, {params})
      .pipe(
        map((response:any) => response.result),
        catchError(this.handleError)
      );
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      if (!password) return null;

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      const valid = passwordRegex.test(password);
      return valid ? null : { passwordStrength: true };
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.root.get('password')?.value;
      const confirmPassword = control.value;

      if (!password || !confirmPassword) {
        return { required: true };
      } else if (password !== confirmPassword) {
        return { passwordMismatch: true };
      } else {
        return null;
      }
    };
  }

  subdomainValidator(): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const subdomain = control.value;

      if (!subdomain) {
        return of(null);
      }

      return this.postSubDomainValidation(subdomain).pipe(
        map((response) => {
          if (response.valid) {
            return null;
          } else {
            console.error('Subdomain validation error:', response.msg);
            return { subdomainInvalid: true };
          }
        }),
        catchError(() => {
          return of({ subdomainError: true });
        })
      );
    };
  }

  verifyEmail(email: string, code: string): Observable<any> {
    const requestData = { params: { email, code } };
    return this.http.post<any>(`${this.baseUrl}verify_email`, requestData).pipe(
      map((response) => response.result),
      catchError(this.handleError)
    );
  }
}
