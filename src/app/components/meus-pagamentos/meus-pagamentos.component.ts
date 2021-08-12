import { TaskService } from './../../services/task.service';
import { OnInit, AfterViewInit, Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Task } from 'src/app/models/task.model';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';
import { Subject } from 'rxjs';
import { debounceTime, map, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-meus-pagamentos',
  templateUrl: './meus-pagamentos.component.html',
  styleUrls: ['./meus-pagamentos.component.scss']
})
export class MeusPagamentosComponent implements OnInit, AfterViewInit {

  tasks: Task[] = []
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'edit-delete']
  dataSource: MatTableDataSource<Task>
  totalItems: any
  pageSize: number = 0
  loading = true
  searchName = ''

  @Output() emitValueSearch = new EventEmitter();
  searchSource: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private taskService: TaskService, private toastr: ToastrService, private notificationService: NotificationService) {
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
      error => {
        this.loading = false
        this.showMessageError('Falha ao carregar dados', true)
      })
  }

  pageChanged = () => {
    this.loading = true
    this.pageSize = this.paginator.pageSize
    this.taskService.search(this.searchName, this.paginator.pageIndex, this.pageSize).subscribe(
      response => {
        this.loading = false
        this.tasks = response.body
      },
      error => {
        this.loading = false
        this.showMessageError('Falha ao carregar dados', true)
      }
    )
  }

  showMessageError = (message: string, disableTimeOut: boolean) => {
    this.toastr.error(message, 'Erro', {
      disableTimeOut: disableTimeOut
    })
  }

  sortData = (event) => {
    this.taskService.search(this.searchName, this.paginator.pageIndex, this.pageSize, event.active, event.direction).subscribe(response =>
      this.tasks = response.body
    )
  }

  updatePaidValue = (task: Task) => {
    const taskWithPayedChanged = { ...task, isPayed: !task.isPayed }
    this.taskService.update(taskWithPayedChanged).pipe(timeout(1000)).subscribe(
      response => { this.toastr.success('Status do pagamento atualizado') },
      error => {
        this.showMessageError('Falha ao atualizar status de pagamento', false)
      })
  }

}


