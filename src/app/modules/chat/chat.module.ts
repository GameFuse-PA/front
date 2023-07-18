import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ChatComponent, ChatInputComponent],
    imports: [FormsModule, CommonModule, MatIconModule],
    exports: [ChatComponent, ChatInputComponent],
    providers: [DatePipe],
})
export class ChatModule {}
