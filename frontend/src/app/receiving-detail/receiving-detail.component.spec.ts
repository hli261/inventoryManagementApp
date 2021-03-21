import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingDetailComponent } from './receiving-detail.component';

describe('ReceivingDetailComponent', () => {
  let component: ReceivingDetailComponent;
  let fixture: ComponentFixture<ReceivingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
