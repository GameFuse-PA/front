import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInvitationsComponent } from './my-invitations.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('MyInvitationsComponent', () => {
    let component: MyInvitationsComponent;
    let fixture: ComponentFixture<MyInvitationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
            declarations: [MyInvitationsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyInvitationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
