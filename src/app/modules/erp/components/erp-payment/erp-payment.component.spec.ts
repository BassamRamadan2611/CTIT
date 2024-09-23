import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpPaymentComponent } from './erp-payment.component';

describe('ErpPaymentComponent', () => {
  let component: ErpPaymentComponent;
  let fixture: ComponentFixture<ErpPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErpPaymentComponent]
    });
    fixture = TestBed.createComponent(ErpPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
