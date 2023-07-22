import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversationModel } from '../../models/conversation.model';
import { User } from '../../models/user.model';
import { SocketService } from '../../modules/call/services/socket.service';
import { MessageToBackModel } from '../../models/messageToBack.model';
import { ChatComponent } from '../../modules/chat/components/chat/chat.component';

@Component({
    selector: 'app-my-conversations',
    templateUrl: './my-conversations.component.html',
    styleUrls: ['./my-conversations.component.css'],
})
export class MyConversationsComponent implements OnInit, OnDestroy {
    public conversations: ConversationModel[] = [];
    public selectedConversation: ConversationModel | undefined;
    public me: User | null | undefined;

    @ViewChild(ChatComponent) chatComponent: ChatComponent | undefined;

    constructor(
        private profilServices: ProfilService,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        public socketService: SocketService,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.getConversations();
        this.selectConversation(this.conversations[0]);
        this.me = this.authService.user;
        this.socketService.joinConversation();
        this.socketService.handleNewMessage();
        this.socketService.newMessage.subscribe((chat) => {
            if (chat && chat.conversationId === this.selectedConversation?._id) {
                if (this.selectedConversation?.messages !== undefined) {
                    this.selectedConversation?.messages.push(chat);
                } else {
                    this.selectedConversation = {
                        messages: [],
                    };
                    this.selectedConversation.messages?.push(chat);
                }
            }
            this.chatComponent?.scrollToNewMessage();
        });
    }

    ngOnDestroy(): void {
        this.socketService.disconnectFromChat();
        this.socketService.socket.off('new-message');
    }

    async getConversations(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.profilServices.getConversations().subscribe({
                next: (res: any) => {
                    const conversations = [];
                    for (let conversation of res) {
                        conversations.push(conversation);
                    }
                    this.conversations = conversations;
                    resolve();
                },
                error: (err: any) => {
                    this._snackBar.open(err.message, 'Fermer', {
                        panelClass: ['error-snackbar'],
                    });
                    reject(err);
                },
            });
        });
    }
    async selectConversation(selectedConversation: ConversationModel) {
        if (selectedConversation && selectedConversation._id) {
            await this.profilServices.getConversation(selectedConversation._id).subscribe({
                next: (convFromDb: ConversationModel) => {
                    this.selectedConversation = convFromDb;
                },
                error: (err: any) => {
                    this._snackBar.open(err.message, 'Fermer', {
                        panelClass: ['error-snackbar'],
                    });
                },
            });
        }
    }
}
