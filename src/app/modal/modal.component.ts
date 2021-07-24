import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "my-modal",
  templateUrl: "modal.component.html",
  styleUrls: ["modal.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  ngOnInit() {}
  ngOnDestroy() {}
}
