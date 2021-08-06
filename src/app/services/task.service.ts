import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint = `${environment.API}/tasks`

  constructor(private http: HttpClient) { }

  find = (page: number, limit: number = 5, sort: string = '', order: string = ''): Observable<any> => {
    return this.http.get<any>(this.endpoint, {
      observe: 'response', params: new HttpParams()
        .set('_page', page + 1)
        .set('_limit', limit)
        .set('_sort', sort)
        .set('_order', order)
    })
  }

}
