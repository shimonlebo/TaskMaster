import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            console.error('Client side error:', error.error.message);
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
            errorMsg = `Something bad happened; please try again later.`;
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }
}
