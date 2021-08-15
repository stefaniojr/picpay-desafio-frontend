import { Component, OnInit } from "@angular/core";
import { TaskModel } from "src/app/models/task-model";
import { TasksService } from "src/app/services/tasks.service";

@Component({
  selector: "app-tasks-table",
  templateUrl: "./tasks-table.component.html",
  styleUrls: ["./tasks-table.component.scss"],
  providers: [TasksService],
})
export class TasksTableComponent implements OnInit {
  isLoading: boolean = true;
  dataSource: TaskModel[];

  constructor(public tasksService: TasksService) {
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
    // this.openDialog(task);
  }
}
