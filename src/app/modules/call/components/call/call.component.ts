import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallUser, PeerService } from '../../services/peer.service';
import { SocketService } from '../../services/socket.service';
import {UserToBackDTO} from "../../../../utils/UserToBackDTO";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Utils from "../../../../utils/utils";

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, AfterViewInit {
  public joinedUsers: CallUser[] = [];
  public localStream!: MediaStream;
  public roomId: string = '';
  public isHideChat = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private peerService: PeerService,
    private http: HttpClient,) { }

  ngAfterViewInit(): void {
    this.listenNewUser();
    this.listenLeavedUser();
    this.detectScreenWith();
  }

  ngOnInit(): void {
    this.roomId = <string>this.activatedRoute.snapshot.paramMap.get('roomId');
    Utils.getMediaStream({ video: true, audio: true }).then(stream => {
      this.localStream = stream;
      this.openPeer();
    })
  }

  hideOrUnhideChat(): void {
    this.isHideChat = !this.isHideChat;
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
    this.socketService.leavedId.subscribe(userPeerId => {
      this.joinedUsers = this.joinedUsers.filter(x => x.peerId != userPeerId);
    })
  }

  private listenNewUserJoinRoom(): void {
    this.socketService.joinedId.subscribe(newUserId => {
      if (newUserId) {
        this.makeCall(newUserId);
      }
    })
  }

  private listenNewUserStream(): void {
    this.peerService.joinUser.subscribe(user => {
      if (user) {
        if (this.joinedUsers.findIndex(u => u.peerId === user.peerId) < 0) {
          this.joinedUsers.push(user);
        }
      }
    })
  }

  private openPeer(): void {
    this.peerService.openPeer(this.localStream).then(async (myPeerId) => {
      let userToBack: UserToBackDTO = {
        id: "",
        roomId: this.roomId,
        peerId: myPeerId
      }
      this.joinRoom(userToBack);
    })
  }

  private makeCall(anotherPeerId: string): void {
    this.peerService.call(anotherPeerId, this.localStream);
  }

  private joinRoom(user: UserToBackDTO): void {
    this.socketService.joinRoom(user);
  }

}
