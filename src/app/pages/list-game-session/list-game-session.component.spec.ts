import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGameSessionComponent } from './list-game-session.component';

describe('ListGameSessionComponent', () => {
    let component: ListGameSessionComponent;
    let fixture: ComponentFixture<ListGameSessionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListGameSessionComponent],
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
