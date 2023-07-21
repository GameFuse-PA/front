import { Component, OnInit, ViewChild } from '@angular/core';
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
import { RunnerComponent } from '../../components/runner/runner.component';

@Component({
    selector: 'app-room',
    templateUrl: './game-session.component.html',
    styleUrls: ['./game-session.component.css'],
})
export class RoomComponent implements OnInit {
    public conversation: ConversationModel | undefined;
    public me: User | null | undefined;
    public gameSessionId: string | undefined;
    public isAdmin = false;

    public chatInputIsFocused: boolean = false;

    @ViewChild(ChatComponent) chatComponent: ChatComponent | undefined;
    @ViewChild(RunnerComponent) runnerComponent: RunnerComponent | undefined;

    constructor(
        private profilService: ProfilService,
        public socketService: SocketService,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
    ) {}

    async ngOnInit(): Promise<void> {
        this.me = this.authService.user;

        this.gameSessionId = String(this.route.snapshot.paramMap.get('gameSessionId'));

        this.profilService.getGameSession(this.gameSessionId).subscribe({
            next: async (res: any) => {
                this.isAdmin = res.createdBy === this.me?._id;
                const joinGameSessionChatDTO: JoinGameSessionChatDTO = {
                    conversationId: res.conversation._id,
                    gameSessionId: this.gameSessionId,
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

    private async joinGameSessionChat(
        joinGameSessionChatDTO: JoinGameSessionChatDTO,
    ): Promise<void> {
        this.socketService.joinGameSessionChat(joinGameSessionChatDTO);
    }

    public reloadRunner() {
        this.runnerComponent?.retrieveState();
    }
}
