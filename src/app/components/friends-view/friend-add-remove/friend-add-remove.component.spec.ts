import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendAddRemoveComponent } from './friend-add-remove.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('FriendAddRemoveComponent', () => {
    let component: FriendAddRemoveComponent;
    let fixture: ComponentFixture<FriendAddRemoveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
            declarations: [FriendAddRemoveComponent],
        }).compileComponents();
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
