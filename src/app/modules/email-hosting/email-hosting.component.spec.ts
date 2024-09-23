import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHostingComponent } from './email-hosting.component';

describe('EmailHostingComponent', () => {
  let component: EmailHostingComponent;
  let fixture: ComponentFixture<EmailHostingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailHostingComponent]
    });
    fixture = TestBed.createComponent(EmailHostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
