import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferRouterComponent } from './data-transfer-router.component';

describe('DataTransferRouterComponent', () => {
  let component: DataTransferRouterComponent;
  let fixture: ComponentFixture<DataTransferRouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTransferRouterComponent]
    });
    fixture = TestBed.createComponent(DataTransferRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
