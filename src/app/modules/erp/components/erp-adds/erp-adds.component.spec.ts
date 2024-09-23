import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpAddsComponent } from './erp-adds.component';

describe('ErpAddsComponent', () => {
  let component: ErpAddsComponent;
  let fixture: ComponentFixture<ErpAddsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErpAddsComponent]
    });
    fixture = TestBed.createComponent(ErpAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
