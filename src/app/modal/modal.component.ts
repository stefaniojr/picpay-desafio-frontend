import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { ModalService } from "./modal.service";

@Component({
  selector: "my-modal",
  templateUrl: "modal.component.html",
  styleUrls: ["modal.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    if (!this.id) throw new Error("Modal must have an id");

    const element: HTMLDivElement = this.element;

    document.body.appendChild(element);

    element.addEventListener("click", (element: any) => {
      if (element.target.className === "my-modal") this.close();
    });

    this.modalService.add(this);
  }

  ngOnDestroy() {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open() {
    this.element.style.display = "block";
    document.body.classList.add("my-modal-open");
  }

  close() {
    this.element.style.display = "none";
    console.log(this.element);
    document.body.classList.remove("my-modal-open");
  }
}
