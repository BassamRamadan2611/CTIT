import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHostingPaymentComponent } from './email-hosting-payment.component';

describe('EmailHostingPaymentComponent', () => {
  let component: EmailHostingPaymentComponent;
  let fixture: ComponentFixture<EmailHostingPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailHostingPaymentComponent]
    });
    fixture = TestBed.createComponent(EmailHostingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
