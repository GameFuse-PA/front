import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureServerComponent } from './picture-server.component';

describe('ProfilPictureComponent', () => {
    let component: PictureServerComponent;
    let fixture: ComponentFixture<PictureServerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PictureServerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PictureServerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
