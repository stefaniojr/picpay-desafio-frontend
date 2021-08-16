import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskModel } from "../models/task-model";

@Injectable()
export class TasksService {
  tasksApiUrl = "http://localhost:3000/tasks";
  constructor(private http: HttpClient) {}
  getTasks(active?, direction?): Observable<TaskModel[]> {
    if (active && direction) {
      return this.http.get<TaskModel[]>(
        `${this.tasksApiUrl}?_sort=${active}&_order=${direction}`
      );
    } else {
      return this.http.get<TaskModel[]>(this.tasksApiUrl);
    }
  }

  createTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.tasksApiUrl, task);
  }

  editTask(task: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.tasksApiUrl}/${task.id}`, task);
  }

  deleteTask(id: Number): Observable<any> {
    return this.http.delete<any>(`${this.tasksApiUrl}/${id}`);
  }
}
