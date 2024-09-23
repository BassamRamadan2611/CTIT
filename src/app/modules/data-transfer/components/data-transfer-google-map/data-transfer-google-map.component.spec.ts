import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferGoogleMapComponent } from './data-transfer-google-map.component';

describe('DataTransferGoogleMapComponent', () => {
  let component: DataTransferGoogleMapComponent;
  let fixture: ComponentFixture<DataTransferGoogleMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTransferGoogleMapComponent]
    });
    fixture = TestBed.createComponent(DataTransferGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
