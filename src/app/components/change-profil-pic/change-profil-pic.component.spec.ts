import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfilPicComponent } from './change-profil-pic.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChangeProfilPicComponent', () => {
    let component: ChangeProfilPicComponent;
    let fixture: ComponentFixture<ChangeProfilPicComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChangeProfilPicComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeProfilPicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
