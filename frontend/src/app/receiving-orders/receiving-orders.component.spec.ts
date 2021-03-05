import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingOrdersComponent } from './receiving-orders.component';

describe('ReceivingOrdersComponent', () => {
  let component: ReceivingOrdersComponent;
  let fixture: ComponentFixture<ReceivingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
