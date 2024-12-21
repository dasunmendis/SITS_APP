import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private readonly apiBaseUrl = environment.apiBaseUrl  

  // GET Request Example
  getData(apiEndPoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}` + apiEndPoint).pipe(
      catchError(this.handleError)
    );
  }

  // HttpPost Request
  postData(apiEndPoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}` + apiEndPoint, data).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.status === 400) {
      errorMessage = 'Bad request. Please check the data you are sending.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized. Please log in.';
    } else if (error.status === 404) {
      errorMessage = 'Resource not found. Please verify the URL.';
    } else if (error.status === 500) {
      errorMessage = 'Internal server error. Please try again later.';
    } else if (error.status === 503) {
      errorMessage = 'Service unavailable. Please try again later.';
    }

    return throwError(errorMessage); // Return an observable with an error message
  }

}
