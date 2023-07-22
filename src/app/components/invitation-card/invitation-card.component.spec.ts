import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationCardComponent } from './invitation-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('InvitationCardComponent', () => {
    let component: InvitationCardComponent;
    let fixture: ComponentFixture<InvitationCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InvitationCardComponent],
            imports: [HttpClientModule, MatSnackBarModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InvitationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
