import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = environment.BASE_URL;

  getAll(apiPath: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${apiPath}`);
  }

  getById(apiPath: string, id: string | number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${apiPath}/${id}`);
  }

  post(apiPath: string, data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${apiPath}`, data);
  }

  put(apiPath: string, id: string | number, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${apiPath}/${id}`, data);
  }

  delete(apiPath: string, id: string | number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${apiPath}/${id}`);
  }
}
