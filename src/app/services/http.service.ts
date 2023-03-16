import { HttpClient, HttpErrorResponse, HttpHeaders } from  '@angular/common/http';
import { throwError, catchError, retry } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'http://localhost:4000/graphql';

  private options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  query(query: string) {
    return this.http.post(this.url, query, this.options).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);

    return throwError(() => {
      if (error.status > 0) {
        return error.message + ". " + error.error.errors[0].message;
      } else {
        return error.message;
      }
    });
  }
}
