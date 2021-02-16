import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBinsComponent } from './item-bins.component';

describe('ItemBinsComponent', () => {
  let component: ItemBinsComponent;
  let fixture: ComponentFixture<ItemBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemBinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
