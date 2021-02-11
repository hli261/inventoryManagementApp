import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinItemManagementComponent } from './bin-item-management.component';

describe('BinItemManagementComponent', () => {
  let component: BinItemManagementComponent;
  let fixture: ComponentFixture<BinItemManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinItemManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinItemManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
