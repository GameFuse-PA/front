import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPageComponent } from './friends-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FriendsComponent', () => {
    let component: FriendsPageComponent;
    let fixture: ComponentFixture<FriendsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
            declarations: [FriendsPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FriendsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
