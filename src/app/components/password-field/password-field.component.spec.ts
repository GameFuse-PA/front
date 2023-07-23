import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFieldComponent } from './password-field.component';
import { ResetPasswordModel } from '../../models/reset-password.model';

describe('PasswordFieldComponent', () => {
    let component: PasswordFieldComponent;
    let fixture: ComponentFixture<PasswordFieldComponent>;
    const user: ResetPasswordModel = {
        password: 'test',
        checkPassword: 'test',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PasswordFieldComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
