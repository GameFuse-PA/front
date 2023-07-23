import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Peer from 'peerjs';
import { environment } from '../../../../environments/environment';

export interface CallUser {
    peerId: string;
    stream: MediaStream;
}
@Injectable()
export class PeerService {
    public peer: Peer | undefined;
    public myPeerId!: string;
    public joinUser = new BehaviorSubject<CallUser | null>(null);
    constructor() {}

    public openPeer(stream: MediaStream): Promise<string> {
        return new Promise<string>((resolve) => {
            this.initPeer();
            if (this.peer !== undefined) {
                this.peer.on('open', (uerPeerId: string) => {
                    this.myPeerId = uerPeerId;
                    this.handleInComingCall(stream);
                    resolve(uerPeerId);
                });
            }
        });
    }

    public call(anotherPeerId: string, stream: MediaStream): void {
        if (this.peer) {
            const call = this.peer.call(anotherPeerId, stream);
            this.handelCall(call, anotherPeerId);
        }
    }

    public handelCall(call: any, anotherPeerId: string): void {
        call.on('stream', (anotherStream: any) => {
            this.joinUser.next({ peerId: anotherPeerId, stream: anotherStream });
        });
    }

    private handleInComingCall(stream: MediaStream): void {
        if (this.peer) {
            this.peer.on('call', (call: any) => {
                call.answer(stream);
                call.on('stream', (anotherStream: any) => {
                    this.joinUser.next({ peerId: call.peer, stream: anotherStream });
                });
            });
        }
    }

    private initPeer(): void {
        this.peer = new Peer({
            config: {
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            },
            host: '/',
            port: environment.peerPort,
        });
    }
}
