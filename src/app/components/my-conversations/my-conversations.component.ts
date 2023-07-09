import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversationModel } from '../../models/conversation.model';
import { User } from '../../models/user.model';
import { SocketService } from '../../modules/call/services/socket.service';
import { MessageModel } from '../../models/message.model';
import { MessageForBackModel } from '../../models/messageForBack.model';

@Component({
    selector: 'app-my-conversations',
    templateUrl: './my-conversations.component.html',
    styleUrls: ['./my-conversations.component.css'],
})
export class MyConversationsComponent implements OnInit {
    public conversations: ConversationModel[] = [];
    public selectedConversation: number = 0;
    public me: User | undefined;
    private receiver: User | undefined;

    constructor(
        private profilServices: ProfilService,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.getConversations();
        this.selectConversation(this.selectedConversation);
        const userFromLocalStorage = localStorage.getItem('user');
        if (userFromLocalStorage) {
            this.me = JSON.parse(userFromLocalStorage);
        }
        if (this.conversations?.[this.selectedConversation]?.socket !== undefined) {
            const conversationId = this.conversations[this.selectedConversation].id;
            const conversationSocket = this.conversations?.[this.selectedConversation]?.socket;
            if (conversationId != null && conversationSocket) {
                conversationSocket.joinConversation(conversationId);
                this.handleNewMessage(conversationSocket);
            }
            console.log('conversationId in ngoninit my conversation compo : ' + conversationId);
        }
    }

    handleNewMessage(socketService: SocketService): void {
        socketService.newMessageForConversation.subscribe((chat) => {
            if (chat) {
                const conversationIndex = this.conversations.findIndex(
                    (conversation) => conversation.id === chat.conversationId,
                );
                if (conversationIndex !== -1) {
                    const conversation = this.conversations[conversationIndex];
                    if (conversation.messages) {
                        conversation.messages.push(chat);
                    }
                }
            }
        });
    }

    getConversations() {
        this.profilServices.getConversations().subscribe({
            next: (res: any) => {
                const conversations = [];
                for (let conversation of res) {
                    conversations.push(conversation);
                }
                this.conversations = conversations;
                console.log(this.conversations);
            },
            error: (err: any) => {
                this._snackBar.open(err.message, 'Fermer', {
                    panelClass: ['error-snackbar'],
                });
            },
        });
        this.selectedConversation = 0;
    }

    selectConversation(conversationIndex: number) {
        this.selectedConversation = conversationIndex;
        this.receiver =
            this.conversations[this.selectedConversation]?.users?.[0]?.username ===
            this.me?.username
                ? this.conversations[this.selectedConversation]?.users?.[1]
                : this.conversations[this.selectedConversation]?.users?.[1];
    }

    public addMessage(message: string): void {
        let chat: MessageModel = {
            content: message,
            from: this.me,
            date: Date.now(),
        };
        let messageForBack: MessageForBackModel = {
            content: message,
            conversationId: this.conversations[this.selectedConversation].id,
        };
        const socketService = this.conversations[this.selectedConversation].socket;
        if (socketService !== undefined) {
            socketService.chatConversation(messageForBack);
        }
        this.conversations[this.selectedConversation]?.messages?.push(chat);
        this.scrollToNewMessage();
    }

    private scrollToNewMessage(): void {
        setTimeout(() => {
            // @ts-ignore
            const lastMessage = document.getElementById(`${this.conversation?.length - 1}`);
            if (lastMessage) {
                lastMessage.scrollIntoView();
            }
        }, 200);
    }
}
