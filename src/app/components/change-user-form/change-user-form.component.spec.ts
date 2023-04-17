import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserFormComponent } from './change-user-form.component';

describe('ChangeUserFormComponent', () => {
  let component: ChangeUserFormComponent;
  let fixture: ComponentFixture<ChangeUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
