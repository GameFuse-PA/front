import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterRunnerComponent } from './alter-runner.component';

describe('AlterRunnerComponent', () => {
    let component: AlterRunnerComponent;
    let fixture: ComponentFixture<AlterRunnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AlterRunnerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AlterRunnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
