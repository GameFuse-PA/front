import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserFormComponent } from './change-user-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChangeUserFormComponent', () => {
    let component: ChangeUserFormComponent;
    let fixture: ComponentFixture<ChangeUserFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [ChangeUserFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeUserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
