import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBanksComponent } from './manage-banks.component';

describe('ManageBanksComponent', () => {
  let component: ManageBanksComponent;
  let fixture: ComponentFixture<ManageBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
