import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMemberSearchComponent } from './user-member-search.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UserMemberSearchComponent', () => {
    let component: UserMemberSearchComponent;
    let fixture: ComponentFixture<UserMemberSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule, MatSnackBarModule],
            declarations: [UserMemberSearchComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserMemberSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
