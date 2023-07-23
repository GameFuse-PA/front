import { TestBed } from '@angular/core/testing';

import { RunnerService } from './runner.service';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('RunnerService', () => {
    let service: RunnerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, MatDialogModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ],
        });
        service = TestBed.inject(RunnerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
