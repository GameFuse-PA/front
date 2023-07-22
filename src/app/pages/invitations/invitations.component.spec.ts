import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsComponent } from './invitations.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('InvitationsComponent', () => {
    let component: InvitationsComponent;
    let fixture: ComponentFixture<InvitationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
            declarations: [InvitationsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InvitationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
