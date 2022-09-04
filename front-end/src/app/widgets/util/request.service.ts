import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": 'application/json',
      "accept": "text/plain",
    });
  };

  public get<T>(url: string, queryParams: any = null, responseType?: any): Observable<T> {
    if (queryParams != null) return this.http.get<T>(url, { headers: this.headers, responseType: (responseType) ? responseType : null, params: queryParams });

    return this.http.get<T>(url, { headers: this.headers, responseType: (responseType) ? responseType : null });
  };

  public post<T>(url: string, params: any): Observable<T> {
    return this.http.post<T>(url, params, { headers: this.headers });
  };

  public patch<T>(url: string, params: any): Observable<T> {
    return this.http.patch<T>(url, params, { headers: this.headers });
  };

  public put<T>(url: string, params: any): Observable<T> {
    return this.http.put<T>(url, params, { headers: this.headers });
  };

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this.headers });
  };


}
