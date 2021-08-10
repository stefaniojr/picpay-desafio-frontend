import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private dialogNotificationSource = new Subject<any>()
  dialogNotification$ = this.dialogNotificationSource.asObservable()

  constructor() { }

  loadData = (load: boolean) => {
    this.dialogNotificationSource.next(load)
  }
}
