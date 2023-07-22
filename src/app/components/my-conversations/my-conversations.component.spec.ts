import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConversationsComponent } from './my-conversations.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {CallModule} from "../../modules/call/call.module";

describe('MyConversationsComponent', () => {
    let component: MyConversationsComponent;
    let fixture: ComponentFixture<MyConversationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, CallModule],
            declarations: [MyConversationsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyConversationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
