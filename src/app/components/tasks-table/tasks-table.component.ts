import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { TaskModel } from "src/app/models/task-model";
import { sort, TasksService } from "src/app/services/tasks.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalCreateComponent } from "../modal-create/modal-create.component";
import { DecimalPipe, formatDate } from "@angular/common";
import { DeleteConfirmComponent } from "../delete-confirm/delete-confirm.component";
import {
  SortEventModel,
  SortStateModel,
} from "src/app/models/search-result-model";
import { Observable } from "rxjs";

@Component({
  selector: "app-tasks-table",
  templateUrl: "./tasks-table.component.html",
  styleUrls: ["./tasks-table.component.scss"],
  providers: [TasksService, DecimalPipe],
})
export class TasksTableComponent implements OnInit {
  isLoading: boolean = true;
  dataSource: TaskModel[];

  searchParams: SortStateModel = {
    page: 1,
    pageSize: 5,
    searchTerm: "",
    sortColumn: "date",
    sortDirection: "desc",
  };
  collectionSize: Number;

  tasks$: Observable<TaskModel[]>;
  total$: Observable<number>;

  constructor(public tasksService: TasksService, public dialog: MatDialog) {
    this.getTasks(this.searchParams);
  }

  ngOnInit(): void {}

  getTasks(params: SortStateModel): void {
    this.tasksService.getTasks(params).subscribe(({ headers, body }) => {
      this.dataSource = body;
      this.collectionSize = Number(headers.get("X-Total-Count"));
    });
  }

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe();
    this.getTasks(this.searchParams);
  }

  editTask(task: TaskModel): void {
    task.date = formatDate(task.date, "yyyy-MM-ddTHH:mm", "en-US", "-0300");
    this.openDialog(task);
  }

  openDialog(task: TaskModel | null): void {
    const dialogRef = this.dialog.open(ModalCreateComponent, {
      width: "40rem",
      data:
        task === null
          ? {
              id: null,
              name: "",
              username: "",
              title: "",
              value: null,
              date: formatDate(
                new Date(),
                "yyyy-MM-ddTHH:mm",
                "en-US",
                "-0300"
              ),
              image: "https://i.pravatar.cc/300",
              isPayed: false,
            }
          : task,
    });

    dialogRef.afterClosed().subscribe((task) => {
      console.log(task);
      if (task && task.id === null) {
        this.tasksService.createTask(task).subscribe();
      }
      if (task && task.id) {
        this.tasksService.editTask(task).subscribe();
      }
      this.getTasks(this.searchParams);
    });
  }

  openDeleteConfirm(task: TaskModel | null): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: "25rem",
      data: task,
    });

    dialogRef.afterClosed().subscribe((task) => {
      this.tasksService.deleteTask(task.id).subscribe();
      this.getTasks(this.searchParams);
    });
  }

  formatTaskDate(date: Date) {
    if (date) {
      return formatDate(date, "dd MMM yyyy HH:mm", "en-US");
    }
  }

  formatTaskValue(value: Number) {
    if (value) {
      return value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    }
  }

  editStatus(task: TaskModel) {
    task.isPayed = !task.isPayed;
    this.tasksService.editTask(task).subscribe();
    this.getTasks(this.searchParams);
  }

  onSort({ active, direction }: SortEventModel) {
    this.searchParams.sortColumn = active;
    this.searchParams.sortDirection = direction;
    this.dataSource = sort(this.dataSource, active, direction);
  }

  refreshPage() {
    this.getTasks(this.searchParams);
  }

  onSearch(event) {
    this.searchParams.searchTerm = event.target.value;
    this.getTasks(this.searchParams);
  }
}
