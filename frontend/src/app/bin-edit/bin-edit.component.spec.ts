import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinEditComponent } from './bin-edit.component';

describe('BinEditComponent', () => {
  let component: BinEditComponent;
  let fixture: ComponentFixture<BinEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
