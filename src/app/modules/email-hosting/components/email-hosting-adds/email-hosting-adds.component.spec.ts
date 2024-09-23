import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHostingAddsComponent } from './email-hosting-adds.component';

describe('EmailHostingAddsComponent', () => {
  let component: EmailHostingAddsComponent;
  let fixture: ComponentFixture<EmailHostingAddsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailHostingAddsComponent]
    });
    fixture = TestBed.createComponent(EmailHostingAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
