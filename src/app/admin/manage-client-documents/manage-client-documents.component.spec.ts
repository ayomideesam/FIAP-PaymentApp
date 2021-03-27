import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClientDocumentsComponent } from './manage-client-documents.component';

describe('ManageClientDocumentsComponent', () => {
  let component: ManageClientDocumentsComponent;
  let fixture: ComponentFixture<ManageClientDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClientDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClientDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
