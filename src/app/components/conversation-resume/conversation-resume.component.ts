import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ConversationModel } from '../../models/conversation.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-conversation-resume',
    templateUrl: './conversation-resume.component.html',
    styleUrls: ['./conversation-resume.component.css'],
})
export class ConversationResumeComponent implements OnInit {
    @Input() conversation: ConversationModel | undefined;
    public me: User | null | undefined;
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.me = this.authService.user;
    }

    isSrcDefined(): boolean {
        if (this.getAvatarSrc() == null || this.getAvatarSrc() == undefined) {
            return false;
        } else {
            return true;
        }
    }

    getAvatarSrc(): string | undefined {
        if (this.conversation?.users?.[0]?._id === this.me?._id) {
            return this.conversation?.users?.[1]?.avatar?.location;
        } else {
            return this.conversation?.users?.[0]?.avatar?.location;
        }
    }
}
