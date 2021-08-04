import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint = `${environment.API}/tasks`

  constructor(private http: HttpClient) { }

  all = (): Observable<Task[]> => {
    return this.http.get<Task[]>(this.endpoint)
  }
}
