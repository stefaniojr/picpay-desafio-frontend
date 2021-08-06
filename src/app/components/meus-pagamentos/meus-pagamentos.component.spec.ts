import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPagamentosComponent } from './meus-pagamentos.component';

describe('MeusPagamentosComponent', () => {
  let component: MeusPagamentosComponent;
  let fixture: ComponentFixture<MeusPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusPagamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
