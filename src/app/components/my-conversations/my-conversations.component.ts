import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversationModel } from '../../models/conversation.model';
import { User } from '../../models/user.model';
import { SocketService } from '../../modules/call/services/socket.service';
import { UserToBackDTO } from '../../utils/UserToBackDTO';

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
        private socketService: SocketService,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.getConversations();
        this.selectConversation(this.selectedConversation);
        const userFromLocalStorage = localStorage.getItem('user');
        if (userFromLocalStorage) {
            this.me = JSON.parse(userFromLocalStorage);
        }
        const user: UserToBackDTO = {
            id: this.me?._id,
            roomId: this.conversations[this.selectedConversation]._id,
        };
        await this.joinRoom(user);
    }

    private async joinRoom(user: UserToBackDTO): Promise<void> {
        this.socketService.joinRoom(user);
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
            this.selectedConversation = 0;
        });
    }

    async selectConversation(conversationIndex: number) {
        if (this.selectedConversation !== conversationIndex) {
            const previousConversationId = this.conversations[this.selectedConversation]._id;
            const previousUser: UserToBackDTO = {
                id: this.me?._id,
                roomId: previousConversationId,
            };
            await this.leaveRoom(previousUser);
        }
        this.selectedConversation = conversationIndex;
        this.receiver =
            this.conversations[this.selectedConversation]?.users?.[0]?.username ===
            this.me?.username
                ? this.conversations[this.selectedConversation]?.users?.[1]
                : this.conversations[this.selectedConversation]?.users?.[1];
        const newUser: UserToBackDTO = {
            id: this.me?._id,
            roomId: this.conversations[this.selectedConversation]._id,
        };
        const newConversationId = this.conversations[this.selectedConversation]._id;
        if (newConversationId != undefined) {
            await this.profilServices.getConversation(newConversationId).subscribe({
                next: (convFromDb: ConversationModel) => {
                    this.conversations[this.selectedConversation] = convFromDb;
                },
                error: (err: any) => {
                    this._snackBar.open(err.message, 'Fermer', {
                        panelClass: ['error-snackbar'],
                    });
                },
            });
        }
        await this.joinRoom(newUser);
    }

    private async leaveRoom(user: UserToBackDTO): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.socketService.leaveRoom(user);
            resolve();
        });
    }
}
