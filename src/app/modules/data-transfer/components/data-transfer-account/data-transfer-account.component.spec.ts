import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferAccountComponent } from './data-transfer-account.component';

describe('DataTransferAccountComponent', () => {
  let component: DataTransferAccountComponent;
  let fixture: ComponentFixture<DataTransferAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTransferAccountComponent]
    });
    fixture = TestBed.createComponent(DataTransferAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
