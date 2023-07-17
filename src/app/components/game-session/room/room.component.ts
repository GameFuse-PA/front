import { Component, OnInit, ViewChild } from '@angular/core';
import { ConversationModel } from '../../../models/conversation.model';
import { ProfilService } from '../../../services/profil/profil.service';
import { SocketService } from '../../../modules/call/services/socket.service';
import { MessageToBackModel } from '../../../models/messageToBack.model';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth/auth.service';
import { ChatComponent } from '../../../modules/chat/components/chat/chat.component';
import { JoinGameSessionChatDTO } from './dto/JoinGameSessionChatDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JoinGameSessionVisioDTO } from './dto/JoinGameSessionVisioDTO';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
    public conversation: ConversationModel | undefined;
    public me: User | null | undefined;
    private gameSessionId: string | undefined;

    @ViewChild(ChatComponent) chatComponent: ChatComponent | undefined;

    constructor(
        private profilService: ProfilService,
        public socketService: SocketService,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
    ) {}

    isHideChat = true;

    async ngOnInit(): Promise<void> {
        this.me = this.authService.user;
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        const gameSessionId = parts[parts.length - 1];
        this.profilService.getGameSession(gameSessionId).subscribe({
            next: async (res: any) => {
                const joinGameSessionChatDTO: JoinGameSessionChatDTO = {
                    conversationId: res.conversation._id,
                    gameSessionId: gameSessionId,
                };
                this.joinGameSessionChat(joinGameSessionChatDTO);
                this.socketService.newMessage.subscribe((chat) => {
                    if (chat && chat.conversationId === this.conversation?._id) {
                        if (this.conversation?.messages !== undefined) {
                            this.conversation?.messages.push(chat);
                        } else {
                            this.conversation = {
                                messages: [],
                            };
                            this.conversation.messages?.push(chat);
                        }
                    }
                    this.chatComponent?.scrollToNewMessage();
                });
                if (res.conversation !== undefined) {
                    this.conversation = res.conversation;
                } else {
                    this.conversation = {
                        messages: [],
                    };
                }
                this.gameSessionId = gameSessionId;
            },
            error: (err: any) => {
                this._snackBar.open(err.message, 'Fermer', {
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    public async readyToJoinGameSessionVisio(peerId: string) {
        if (this.conversation?._id !== undefined) {
            const request: JoinGameSessionVisioDTO = {
                conversationId: this.conversation?._id,
                peerId: peerId,
            };
            this.socketService.joinGameSessionVisio(request);
        }
    }

    async addMessage(message: string) {
        if (this.conversation?.users != undefined) {
            let recipient = undefined;
            if (this.me?._id === this.conversation?.users[0]._id) {
                recipient = this.conversation?.users[1];
            } else {
                recipient = this.conversation?.users[0];
            }
            const chatToBack: MessageToBackModel = {
                content: message,
                to: recipient._id,
            };
            this.socketService.sendChat(chatToBack);
        }
    }

    private async joinGameSessionChat(
        joinGameSessionChatDTO: JoinGameSessionChatDTO,
    ): Promise<void> {
        this.socketService.joinGameSessionChat(joinGameSessionChatDTO);
    }
}
