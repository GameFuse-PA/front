import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGameSessionComponent } from './list-game-session.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ListGameSessionComponent', () => {
    let component: ListGameSessionComponent;
    let fixture: ComponentFixture<ListGameSessionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListGameSessionComponent],
            imports: [
                MatDialogModule,
                RouterTestingModule,
                HttpClientTestingModule,
                MatSnackBarModule,
                NgxPaginationModule,
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListGameSessionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
