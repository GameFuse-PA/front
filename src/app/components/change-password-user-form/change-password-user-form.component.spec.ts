import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordUserFormComponent } from './change-password-user-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChangePasswordUserFormComponent', () => {
    let component: ChangePasswordUserFormComponent;
    let fixture: ComponentFixture<ChangePasswordUserFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [ChangePasswordUserFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordUserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
