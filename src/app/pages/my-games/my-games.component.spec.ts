import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGamesComponent } from './my-games.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

describe('MyGamesComponent', () => {
    let component: MyGamesComponent;
    let fixture: ComponentFixture<MyGamesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, HttpClientModule],
            declarations: [MyGamesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyGamesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
