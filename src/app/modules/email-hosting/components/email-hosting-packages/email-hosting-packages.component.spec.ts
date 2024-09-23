import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHostingPackagesComponent } from './email-hosting-packages.component';

describe('EmailHostingPackagesComponent', () => {
  let component: EmailHostingPackagesComponent;
  let fixture: ComponentFixture<EmailHostingPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailHostingPackagesComponent]
    });
    fixture = TestBed.createComponent(EmailHostingPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
