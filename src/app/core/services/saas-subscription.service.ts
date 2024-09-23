import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SaasSubscriptionService {
  private baseUrl = 'https://aldaifii.ctit.com.sa/saas/';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getCountries(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}countries`, {}).pipe(
      map((response) => response.result),
      catchError(this.handleError)
    );
  }

  getSubscriptionPlans(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}subscription_plans`, {}).pipe(
      map((response) => response.result),
      catchError(this.handleError)
    );
  }

  getPackages(plan_id: number, country_id: number): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}country_package_pricing`, {
        plan_id,
        country_id,
      })
      .pipe(
        map((response) => response.result),
        catchError(this.handleError)
      );
  }
  checkPromoCode(code:string): Observable<any>{
    const requestData = { params: { code }};
    return this.http
    .post<any>(`${this.baseUrl}check_promo_code`, requestData)
    .pipe(
      map((response) => response.result),
      catchError(this.handleError)
    );
  }
  sendPaymentReciect(params:any): Observable<any>{
    return this.http
    .post<any>(`${this.baseUrl}get_payment_attachment`, {params})
    .pipe(
      map((response) => response.result),
      catchError(this.handleError)
    );
  }
}
