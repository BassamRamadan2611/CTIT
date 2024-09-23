import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferPackagesComponent } from './data-transfer-packages.component';

describe('DataTransferPackagesComponent', () => {
  let component: DataTransferPackagesComponent;
  let fixture: ComponentFixture<DataTransferPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTransferPackagesComponent]
    });
    fixture = TestBed.createComponent(DataTransferPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
