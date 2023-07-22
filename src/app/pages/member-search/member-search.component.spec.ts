import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSearchComponent } from './member-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('MemberSearchComponent', () => {
    let component: MemberSearchComponent;
    let fixture: ComponentFixture<MemberSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
            declarations: [MemberSearchComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
