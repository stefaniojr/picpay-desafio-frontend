import { Component, OnInit } from "@angular/core";
import { TaskModel } from "src/app/models/task-model";
import { TasksService } from "src/app/services/tasks.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalCreateComponent } from "../modal-create/modal-create.component";
import { formatDate } from "@angular/common";
import { DeleteConfirmComponent } from "../delete-confirm/delete-confirm.component";

@Component({
  selector: "app-tasks-table",
  templateUrl: "./tasks-table.component.html",
  styleUrls: ["./tasks-table.component.scss"],
  providers: [TasksService],
})
export class TasksTableComponent implements OnInit {
  isLoading: boolean = true;
  dataSource: TaskModel[];

  constructor(public tasksService: TasksService, public dialog: MatDialog) {
    this.getTasks();
  }

  ngOnInit(): void {}

  getTasks(): void {
    this.tasksService.getTasks().subscribe((data: TaskModel[]) => {
      this.dataSource = data;
      this.isLoading = false;
    });
  }

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe();
    this.getTasks();
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
              image: "https://picsum.photos/200",
              isPayed: false,
            }
          : task,
    });

    dialogRef.afterClosed().subscribe((task) => {
      if (task?.id == null) {
        this.tasksService.createTask(task).subscribe();
      } else {
        this.tasksService.editTask(task).subscribe();
      }
      this.getTasks();
    });
  }

  openDeleteConfirm(task: TaskModel | null): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: "25rem",
      data: task,
    });

    dialogRef.afterClosed().subscribe((task) => {
      this.tasksService.deleteTask(task.id).subscribe();
      this.getTasks();
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
    console.log(task);
    this.tasksService.editTask(task).subscribe();
    this.getTasks;
  }
}
