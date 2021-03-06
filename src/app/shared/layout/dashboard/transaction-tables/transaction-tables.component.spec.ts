import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTablesComponent } from './transaction-tables.component';

describe('TransactionTablesComponent', () => {
  let component: TransactionTablesComponent;
  let fixture: ComponentFixture<TransactionTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
