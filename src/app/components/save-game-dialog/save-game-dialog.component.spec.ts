import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveGameDialogComponent } from './save-game-dialog.component';

describe('SaveGameDialogComponent', () => {
    let component: SaveGameDialogComponent;
    let fixture: ComponentFixture<SaveGameDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SaveGameDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SaveGameDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
