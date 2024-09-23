import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHostingAccountComponent } from './email-hosting-account.component';

describe('EmailHostingAccountComponent', () => {
  let component: EmailHostingAccountComponent;
  let fixture: ComponentFixture<EmailHostingAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailHostingAccountComponent]
    });
    fixture = TestBed.createComponent(EmailHostingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
