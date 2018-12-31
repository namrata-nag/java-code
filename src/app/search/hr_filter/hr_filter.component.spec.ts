import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRFilterComponent } from './hr_filter.component';

describe('HRFilterComponent', () => {
  let component: HRFilterComponent;
  let fixture: ComponentFixture<HRFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
