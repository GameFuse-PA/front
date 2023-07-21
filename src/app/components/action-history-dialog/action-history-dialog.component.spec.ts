import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionHistoryDialogComponent } from './action-history-dialog.component';

describe('ActionHistoryDialogComponent', () => {
  let component: ActionHistoryDialogComponent;
  let fixture: ComponentFixture<ActionHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
