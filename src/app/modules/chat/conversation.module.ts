import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyConversationsComponent } from '../../components/my-conversations/my-conversations.component';
import { ConversationResumeComponent } from '../../conversation-resume/conversation-resume.component';
import { ChatModule } from './chat.module';

@NgModule({
    declarations: [MyConversationsComponent, ConversationResumeComponent],
  imports: [FormsModule, CommonModule, ChatModule],
    exports: [MyConversationsComponent],
})
export class ConversationModule {}
