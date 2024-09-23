import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHostingConfirmEmailComponent } from './email-hosting-confirm-email.component';

describe('EmailHostingConfirmEmailComponent', () => {
  let component: EmailHostingConfirmEmailComponent;
  let fixture: ComponentFixture<EmailHostingConfirmEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailHostingConfirmEmailComponent]
    });
    fixture = TestBed.createComponent(EmailHostingConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
