import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LHeaderComponent } from './l-header.component';

describe('LHeaderComponent', () => {
  let component: LHeaderComponent;
  let fixture: ComponentFixture<LHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
