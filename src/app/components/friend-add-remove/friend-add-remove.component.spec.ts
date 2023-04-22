import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendAddRemoveComponent } from './friend-add-remove.component';

describe('FriendAddRemoveComponent', () => {
  let component: FriendAddRemoveComponent;
  let fixture: ComponentFixture<FriendAddRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendAddRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendAddRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
