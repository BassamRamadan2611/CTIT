import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpPackagesComponent } from './erp-packages.component';

describe('ErpPackagesComponent', () => {
  let component: ErpPackagesComponent;
  let fixture: ComponentFixture<ErpPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErpPackagesComponent]
    });
    fixture = TestBed.createComponent(ErpPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
