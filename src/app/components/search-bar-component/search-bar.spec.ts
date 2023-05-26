import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBar } from './search-bar';

describe('SearchBarFriendComponent', () => {
    let component: SearchBar;
    let fixture: ComponentFixture<SearchBar>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchBar],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBar);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
