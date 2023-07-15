import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallUser, PeerService } from '../../services/peer.service';
import { SocketService } from '../../services/socket.service';
import { UserToBackDTO } from '../../../../utils/UserToBackDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from '../../../../utils/utils';

@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit, AfterViewInit, OnDestroy {
    public joinedUsers: CallUser[] = [];
    public localStream!: MediaStream;
    public roomId: string = '';
    public isHideChat = true;
    @Input() socketService: SocketService | undefined;
    @Output() peerIdChanged = new EventEmitter<string>();

    constructor(private activatedRoute: ActivatedRoute, private peerService: PeerService) {}

    ngAfterViewInit(): void {
        this.listenNewUser();
        this.listenLeavedUser();
        this.detectScreenWith();
    }

    ngOnInit(): void {
        this.roomId = <string>this.activatedRoute.snapshot.paramMap.get('roomId');
        Utils.getMediaStream({ video: true, audio: true }).then((stream) => {
            this.localStream = stream;
            this.openPeer();
        });
    }

    ngOnDestroy(): void {
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => track.stop());
        }
    }

    private detectScreenWith(): void {
        if (window.screen.width > 719) {
            setTimeout(() => {
                this.isHideChat = false;
            }, 200);
        }
    }

    private listenNewUser(): void {
        this.listenNewUserJoinRoom();
        this.listenNewUserStream();
    }

    private listenLeavedUser(): void {
        if (this.socketService != undefined) {
            this.socketService.leavedId.subscribe((userPeerId) => {
                this.joinedUsers = this.joinedUsers.filter((x) => x.peerId != userPeerId);
            });
        }
    }

    private listenNewUserJoinRoom(): void {
        if (this.socketService != undefined) {
            this.socketService.joinedId.subscribe((newUserId) => {
                if (newUserId) {
                    this.makeCall(newUserId);
                }
            });
        }
    }

    private listenNewUserStream(): void {
        this.peerService.joinUser.subscribe((user) => {
            if (user) {
                if (this.joinedUsers.findIndex((u) => u.peerId === user.peerId) < 0) {
                    this.joinedUsers.push(user);
                }
            }
        });
    }

    private openPeer(): void {
        this.peerService.openPeer(this.localStream).then(async (myPeerId) => {
            this.peerIdChanged.emit(myPeerId);
        });
    }

    private makeCall(anotherPeerId: string): void {
        this.peerService.call(anotherPeerId, this.localStream);
    }
}
