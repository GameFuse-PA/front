import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-chat-input',
    templateUrl: 'chat-input.component.html',
    styleUrls: ['chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
    public content: string = '';
    @Output() public whenSubmitMessage = new EventEmitter<string>();
    @Output() focused: EventEmitter<boolean> = new EventEmitter();
    public showEmojiPicker = false;

    ngOnInit(): void {}

    submitMessage(): void {
        if (this.content.trim().length > 0) {
            this.whenSubmitMessage.emit(this.content.trim());
            this.content = '';
        }
    }

    public updateFocus(val: boolean): void {
        this.focused.emit(val);
    }

    addEmoji(event: any) {
        this.content += event.emoji.native;
        this.showEmojiPicker = false;
    }
}
