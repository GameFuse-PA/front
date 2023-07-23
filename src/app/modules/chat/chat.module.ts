import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
    declarations: [ChatComponent, ChatInputComponent],
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        PickerModule,
    ],
    exports: [ChatComponent, ChatInputComponent],
    providers: [DatePipe],
})
export class ChatModule {}
