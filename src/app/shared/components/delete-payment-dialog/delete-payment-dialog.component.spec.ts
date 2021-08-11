import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePaymentDialogComponent } from './delete-payment-dialog.component';

describe('DeletePaymentDialogComponent', () => {
  let component: DeletePaymentDialogComponent;
  let fixture: ComponentFixture<DeletePaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
