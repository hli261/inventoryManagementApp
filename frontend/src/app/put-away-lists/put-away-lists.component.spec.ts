import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutAwayListsComponent } from './put-away-lists.component';

describe('PutAwayListsComponent', () => {
  let component: PutAwayListsComponent;
  let fixture: ComponentFixture<PutAwayListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutAwayListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutAwayListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
