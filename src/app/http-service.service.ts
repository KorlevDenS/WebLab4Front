import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {QueryParams} from "./type";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
  }


  private _createDefaultHeaders(isTokenNeeded?: boolean): HttpHeaders {
    if (isTokenNeeded)
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });

    else return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private _removeNullParams(params: QueryParams | undefined): {} | null {
    if (!params) {
      return null;
    }

    return Object.entries(params).reduce(
      (a: QueryParams, [k, v]) => (v === null ? a : ((a[k] = v), a)),
      {},
    );
  }

  public getData<R>(
    url: string,
    params?: QueryParams,
    isTokenNeeded?: boolean
  ): Observable<R> {
    return this._http
      .get<R>(url, {
        headers: this._createDefaultHeaders(isTokenNeeded),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public putData<R>(
    url: string,
    body?: {},
    params?: QueryParams,
    isTokenNeeded?: boolean
  ): Observable<R> {
    return this._http
      .put<R>(url, body, {
        headers: this._createDefaultHeaders(isTokenNeeded),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public postData<R>(
    url: string,
    body?: {},
    isTokenNeeded?: boolean
  ): Observable<R> {
    return this._http
      .post<R>(url, body, {
        headers: this._createDefaultHeaders(isTokenNeeded),
      }).pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }


  public deleteData<R>(
    url: string,
    params?: QueryParams,
    isTokenNeeded?: boolean
  ): Observable<R> {
    return this._http
      .delete<R>(url, {
        headers: this._createDefaultHeaders(isTokenNeeded),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  private _handleError(e: HttpErrorResponse) {
    const message = e.error.message || "Неизвестная ошибка";
    if (e.status !== 400)
      this._snackBar.open(message, 'Закрыть', {
        duration: 3000
      })
    if (e.status == 405) {
      this._router.navigate(['login']);
    }
  }
}
