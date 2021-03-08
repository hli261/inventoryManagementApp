import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipRecordsComponent } from './ship-records.component';

describe('ShipRecordsComponent', () => {
  let component: ShipRecordsComponent;
  let fixture: ComponentFixture<ShipRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
