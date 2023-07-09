import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ConversationModel } from '../models/conversation.model';

@Component({
    selector: 'app-conversation-resume',
    templateUrl: './conversation-resume.component.html',
    styleUrls: ['./conversation-resume.component.css'],
})
export class ConversationResumeComponent implements OnInit {
    @Input() conversation: ConversationModel | undefined;
    public me: User | undefined;
    constructor() {}

    ngOnInit(): void {
        const userFromLcalStorage = localStorage.getItem('user');
        if (userFromLcalStorage) {
            this.me = JSON.parse(userFromLcalStorage);
        }
    }
}
