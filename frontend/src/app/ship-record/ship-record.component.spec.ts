import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipRecordComponent } from './ship-record.component';

describe('ShipRecordComponent', () => {
  let component: ShipRecordComponent;
  let fixture: ComponentFixture<ShipRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
