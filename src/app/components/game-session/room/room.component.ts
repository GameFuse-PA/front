import { Component, OnInit, ViewChild } from '@angular/core';
import { ConversationModel } from '../../../models/conversation.model';
import { ProfilService } from '../../../services/profil/profil.service';
import { SocketService } from '../../../modules/call/services/socket.service';
import { MessageToBackModel } from '../../../models/messageToBack.model';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth/auth.service';
import { ChatComponent } from '../../../modules/chat/components/chat/chat.component';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
    public conversation: ConversationModel | undefined;
    public me: User | null | undefined;

    @ViewChild(ChatComponent) chatComponent: ChatComponent | undefined;

    constructor(
        private profilService: ProfilService,
        public socketService: SocketService,
        private authService: AuthService,
    ) {}

    isHideChat = true;

    async ngOnInit(): Promise<void> {
        this.me = this.authService.user;
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        const roomId = parts[parts.length - 1];
        console.log('avant le get room');
        this.profilService.getRoom(roomId).subscribe({
            next: async (res: any) => {
                console.log('jaffiche le res ' + res);
                console.log(res.conversation);
                if (res.conversation !== undefined) {
                    this.conversation = res.conversation;
                } else {
                    this.conversation = {
                        messages: [],
                    };
                }
                await this.joinRoom(roomId);
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
            },
            error: (_: any) => {
                console.log('Une erreur est survenue lors de la récupération de la room');
            },
        });
    }

    async addMessage(message: string) {
        if (this.conversation?.users != undefined) {
            let recipient = undefined;
            console.log(this.me?._id);
            console.log(this.conversation?.users[0]._id);
            console.log(this.me?._id === this.conversation?.users[0]._id);
            if (this.me?._id === this.conversation?.users[0]._id) {
                console.log("me n'est pas egal au user 0");
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

    private async joinRoom(roomId: string): Promise<void> {
        this.socketService.joinRoom(roomId);
    }
}
