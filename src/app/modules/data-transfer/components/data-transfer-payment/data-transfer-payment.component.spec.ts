import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferPaymentComponent } from './data-transfer-payment.component';

describe('DataTransferPaymentComponent', () => {
  let component: DataTransferPaymentComponent;
  let fixture: ComponentFixture<DataTransferPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTransferPaymentComponent]
    });
    fixture = TestBed.createComponent(DataTransferPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
