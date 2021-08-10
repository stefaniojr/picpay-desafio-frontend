import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint = `${environment.API}/tasks`

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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

  add = (task: Task): Observable<Task> => {
    return this.http.post<Task>(this.endpoint, task, this.httpOptions)
  }

  update = (task: Task): Observable<Task> => {
    return this.http.put<Task>(`${this.endpoint}/${task.id}`, task, this.httpOptions)
  }

  delete = (task: Task): Observable<any> => {
    return this.http.delete(`${this.endpoint}/${task.id}`)
  }

}
