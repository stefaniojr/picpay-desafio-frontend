import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskModel } from "../models/task-model";
import { SortColumn, SortStateModel } from "../models/search-result-model";

const compare = (
  v1: string | number | boolean,
  v2: string | number | boolean
) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export function sort(
  data: TaskModel[],
  column: SortColumn,
  direction: string
): TaskModel[] {
  if (direction === "" || column === "") {
    return data;
  } else {
    return [...data].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
  }
}

@Injectable()
export class TasksService {
  tasksApiUrl = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) {}

  getTasks(params: SortStateModel): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.tasksApiUrl, {
      observe: "response",
      params: new HttpParams()
        .set("name_like", params.searchTerm)
        // .set("username_like?", searchTerm)
        // .set("date_like", searchTerm)
        // .set("value_like", searchTerm)
        .set("_page", params.page)
        .set("_limit", params.pageSize)
        .set("_sort", params.sortColumn)
        .set("_order", params.sortDirection),
    });
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
