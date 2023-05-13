import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarFriendComponent } from './search-bar-friend.component';

describe('SearchBarFriendComponent', () => {
    let component: SearchBarFriendComponent;
    let fixture: ComponentFixture<SearchBarFriendComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchBarFriendComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBarFriendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
