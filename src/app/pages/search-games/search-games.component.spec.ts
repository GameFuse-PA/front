import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGamesComponent } from './search-games.component';
import { HttpClientModule } from '@angular/common/http';

describe('SearchGamesComponent', () => {
    let component: SearchGamesComponent;
    let fixture: ComponentFixture<SearchGamesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchGamesComponent],
            imports: [HttpClientModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchGamesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
