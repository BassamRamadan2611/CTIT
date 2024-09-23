import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferConfirmEmailComponent } from './data-transfer-confirm-email.component';

describe('DataTransferConfirmEmailComponent', () => {
  let component: DataTransferConfirmEmailComponent;
  let fixture: ComponentFixture<DataTransferConfirmEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTransferConfirmEmailComponent]
    });
    fixture = TestBed.createComponent(DataTransferConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
