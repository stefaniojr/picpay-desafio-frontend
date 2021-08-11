import { TaskService } from './../../services/task.service';
import { OnInit, AfterViewInit, Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Task } from 'src/app/models/task.model';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-meus-pagamentos',
  templateUrl: './meus-pagamentos.component.html',
  styleUrls: ['./meus-pagamentos.component.scss']
})
export class MeusPagamentosComponent implements OnInit, AfterViewInit {

  tasks: Task[] = []
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'edit-delete']
  dataSource: MatTableDataSource<Task>
  totalItems
  pageSize: number = 0
  loading = true
  searchName = ''

  @Output() emitValueSearch = new EventEmitter();
  searchSource: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private taskService: TaskService, private toastr: ToastrService, private notificationService: NotificationService,
    private elementRef: ElementRef) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.getTasks()
    this.dataSource.sort = this.sort
    this.notificationService.dialogNotification$.subscribe(
      loadData => this.getTasks()
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.pageSize = this.paginator.pageSize

    this.searchSource.pipe(
      debounceTime(1000),
      map((value: any) => value.target.value)
    ).subscribe(this.searchTasks)
  }

  searchTasks = (name: string) => {
    this.searchName = name
    this.loading = true
    this.taskService.search(name).subscribe(({ headers, body }) => {
      this.loading = false
      this.totalItems = headers.get('X-Total-Count')
      this.tasks = body
    })
  }

  getTasks = () => {
    this.loading = true
    this.taskService.search(this.searchName, this.paginator.pageIndex).subscribe(({ headers, body }) => {
      this.loading = false
      this.totalItems = headers.get('X-Total-Count')
      this.tasks = body
    },
      error => { this.toastr.error('Falha ao carregar dados', 'Erro') })
  }

  pageChanged = () => {
    this.loading = true
    this.pageSize = this.paginator.pageSize
    this.taskService.search(this.searchName, this.paginator.pageIndex, this.pageSize).subscribe(
      response => {
        this.loading = false
        this.tasks = response.body
      },
      error => { this.toastr.error('Falha ao carregar página', 'Erro') }
    )
  }

  sortData = (event) => {
    this.taskService.search(this.searchName, this.paginator.pageIndex, this.pageSize, event.active, event.direction).subscribe(response =>
      this.tasks = response.body
    )
  }

  updatePaidValue = (task: Task) => {
    const taskWithPayedChanged = { ...task, isPayed: !task.isPayed }
    this.taskService.update(taskWithPayedChanged).subscribe(
      response => { this.toastr.success('Status do pagamento atualizado') },
      error => { this.toastr.error('Falha ao atualizar') })
  }

}


