import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ModalService {
  private modals: Array<any> = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  open(id: string) {
    const modal = this.modals.find((modal) => modal.id === id);
    modal.open();
  }

  close(id: string) {
    const modal = this.modals.find((modal) => modal.id === id);
    modal.close();
  }
}
