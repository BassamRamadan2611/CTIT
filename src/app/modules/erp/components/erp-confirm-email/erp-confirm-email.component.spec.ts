import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpConfirmEmailComponent } from './erp-confirm-email.component';

describe('ErpConfirmEmailComponent', () => {
  let component: ErpConfirmEmailComponent;
  let fixture: ComponentFixture<ErpConfirmEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErpConfirmEmailComponent]
    });
    fixture = TestBed.createComponent(ErpConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
