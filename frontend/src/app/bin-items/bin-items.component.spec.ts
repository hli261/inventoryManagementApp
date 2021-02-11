import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinItemsComponent } from './bin-items.component';

describe('BinItemsComponent', () => {
  let component: BinItemsComponent;
  let fixture: ComponentFixture<BinItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
