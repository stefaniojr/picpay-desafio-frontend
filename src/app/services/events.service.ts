import { Injectable, PipeTransform } from "@angular/core";

import { BehaviorSubject, Observable, of, Subject } from "rxjs";

import { TaskModel } from "../models/task-model";
import { HttpClient } from "@angular/common/http";
import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import {
  SearchResultModel,
  SortColumn,
  SortDirection,
  SortStateModel,
} from "../models/search-result-model";
import { TasksService } from "./tasks.service";

const compare = (
  v1: string | number | boolean,
  v2: string | number | boolean
) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(
  tasks: TaskModel[],
  column: SortColumn,
  direction: string
): TaskModel[] {
  if (direction === "" || column === "") {
    return tasks;
  } else {
    return [...tasks].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
  }
}

function matches(task: TaskModel, term: string, pipe: PipeTransform) {
  return (
    task.name.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(task.value).includes(term)
  );
}

@Injectable({ providedIn: "root" })
export class EventsService {
  dataSource: TaskModel[];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tasks$ = new BehaviorSubject<TaskModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: SortStateModel = {
    page: 1,
    pageSize: 4,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };

  constructor(
    private pipe: DecimalPipe,
    private http: HttpClient,
    public tasksService: TasksService
  ) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this.filterTasks()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._tasks$.next(result.countries);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get tasks$() {
    return this._tasks$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<SortStateModel>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  filterTasks(): Observable<any> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;
    let tasksReq = [
      {
        id: 169,
        name: "Camilla Doxey",
        username: "cdoxey4o",
        title: "Engineer III",
        value: 435.63,
        date: "2021-01-09T14:00:37Z",
        image:
          "https://robohash.org/doloribuslaborequi.png?size=150x150&set=set1",
        isPayed: false,
      },
      {
        id: 170,
        name: "Morganica O'Sheils",
        username: "mosheils4p",
        title: "Analyst Programmer",
        value: 207.4,
        date: "2021-05-05T10:22:13Z",
        image:
          "https://robohash.org/illumexpeditadeleniti.png?size=150x150&set=set1",
        isPayed: true,
      },
    ];
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/tasks");
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        tasksReq = JSON.parse(request.responseText);
      }
    };

    // // 1. sort
    let tasksLocal = sort(tasksReq, sortColumn, sortDirection);

    // // 2. filter
    tasksLocal = tasksLocal.filter((task) =>
      matches(task, searchTerm, this.pipe)
    );
    const total = tasksLocal.length;

    // 3. paginate
    tasksLocal = tasksLocal.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    console.log(sortColumn, sortDirection, pageSize, page, searchTerm);
    return of({ tasksLocal, total });
  }
}
