import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpAccountComponent } from './erp-account.component';

describe('ErpAccountComponent', () => {
  let component: ErpAccountComponent;
  let fixture: ComponentFixture<ErpAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErpAccountComponent]
    });
    fixture = TestBed.createComponent(ErpAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
