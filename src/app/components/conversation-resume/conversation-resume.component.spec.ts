import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationResumeComponent } from './conversation-resume.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConversationResumeComponent', () => {
    let component: ConversationResumeComponent;
    let fixture: ComponentFixture<ConversationResumeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [ConversationResumeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConversationResumeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
