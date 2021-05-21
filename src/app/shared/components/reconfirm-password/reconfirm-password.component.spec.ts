import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconfirmPasswordComponent } from './reconfirm-password.component';

describe('ReconfirmPasswordComponent', () => {
  let component: ReconfirmPasswordComponent;
  let fixture: ComponentFixture<ReconfirmPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconfirmPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconfirmPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
