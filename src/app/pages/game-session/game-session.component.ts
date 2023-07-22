import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConversationModel } from '../../models/conversation.model';
import { ProfilService } from '../../services/profil/profil.service';
import { SocketService } from '../../modules/call/services/socket.service';
import { MessageToBackModel } from '../../models/messageToBack.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { ChatComponent } from '../../modules/chat/components/chat/chat.component';
import { JoinGameSessionChatDTO } from './dto/JoinGameSessionChatDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JoinGameSessionVisioDTO } from './dto/JoinGameSessionVisioDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-room',
    templateUrl: './game-session.component.html',
    styleUrls: ['./game-session.component.css'],
})
export class RoomComponent implements OnInit, OnDestroy {
    public conversation: ConversationModel | undefined;
    public me: User | null | undefined;
    public gameSessionId: string | undefined;

    public chatInputIsFocused: boolean = false;

    @ViewChild(ChatComponent) chatComponent: ChatComponent | undefined;

    constructor(
        private profilService: ProfilService,
        public socketService: SocketService,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.me = this.authService.user;

        this.gameSessionId = String(this.route.snapshot.paramMap.get('gameSessionId'));

        this.profilService.getGameSession(this.gameSessionId).subscribe({
            next: async (res: any) => {
                const joinGameSessionChatDTO: JoinGameSessionChatDTO = {
                    conversationId: res.conversation._id,
                    gameSessionId: this.gameSessionId,
                };
                this.socketService.connectGameSessionChat(joinGameSessionChatDTO);
                this.socketService.handleNewMessage();
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
            },
            error: (err: any) => {
                this._snackBar.open(err.message, 'Fermer', {
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    ngOnDestroy(): void {
        if (this.conversation?._id != undefined) {
            this.socketService.disconnectFromGameSession(this.conversation._id);
            this.socketService.socket.off('new-message');
        }
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
}
