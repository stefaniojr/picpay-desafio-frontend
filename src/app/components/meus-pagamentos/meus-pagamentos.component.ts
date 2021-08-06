import { TaskService } from './../../services/task.service';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-meus-pagamentos',
  templateUrl: './meus-pagamentos.component.html',
  styleUrls: ['./meus-pagamentos.component.scss']
})
export class MeusPagamentosComponent implements OnInit, AfterViewInit {

  tasks: Task[] = []
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed']
  dataSource: MatTableDataSource<Task>
  totalItems: number = 0
  pageSize: number = 0

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private taskService: TaskService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.getTasks()
    this.dataSource.sort = this.sort
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.pageSize = this.paginator.pageSize
  }

  getTasks = () => {
    this.taskService.find(this.paginator.pageIndex).subscribe(({ headers, body }) => {
      this.totalItems = headers.get('X-Total-Count')
      this.tasks = body
    })
  }

  pageChanged = () => {
    this.pageSize = this.paginator.pageSize
    this.taskService.find(this.paginator.pageIndex, this.pageSize).subscribe(response =>
      this.tasks = response.body
    )
  }

  sortData = (event) => {
    this.taskService.find(this.paginator.pageIndex, this.pageSize, event.active, event.direction).subscribe(response =>
      this.tasks = response.body
    )
  }

}
