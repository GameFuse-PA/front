import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordUserFormComponent } from './change-password-user-form.component';

describe('ChangePasswordUserFormComponent', () => {
    let component: ChangePasswordUserFormComponent;
    let fixture: ComponentFixture<ChangePasswordUserFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
