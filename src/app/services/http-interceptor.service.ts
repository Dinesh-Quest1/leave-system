import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { snackBar, startLoader, stopLoader } from '../stores/app.action';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private readonly store: Store) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(startLoader());
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch(stopLoader());
        let errorMessage = error.message;
        if (error.status === 0) {
          errorMessage = 'Server is down';
        } else if (error.status === 404) {
          errorMessage = 'Not Found';
        }
        this.store.dispatch(snackBar({ message: errorMessage }));
        return throwError(() => error);
      })
    );
  }
}
