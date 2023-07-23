import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmActionComponent } from './confirm-action.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

enum type {
    CLICK,
    KEY,
    TEXT,
}

describe('ConfirmActionComponent', () => {
    let component: ConfirmActionComponent;
    let fixture: ComponentFixture<ConfirmActionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule],
            declarations: [ConfirmActionComponent],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: { action: type.CLICK } },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
