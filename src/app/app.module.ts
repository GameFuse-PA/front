import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './services/request.interceptor';
import { ChatHomeComponent } from './components/chat-home/chat-home.component';
import { PageNotFoundComponent } from './components/not-found/page-not-found.component';
import { ProfilPageComponent } from './pages/profilpage/profil-page.component';
import { ChangeUserFormComponent } from './components/change-user-form/change-user-form.component';
import { PictureServerComponent } from './components/picture-server/picture-server.component';
import { ChangeProfilPicComponent } from './components/change-profil-pic/change-profil-pic.component';
import { PasswordFieldComponent } from './components/password-field/password-field.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangePasswordUserFormComponent } from './components/change-password-user-form/change-password-user-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { MyGamesComponent } from './pages/my-games/my-games.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SaveGameDialogComponent } from './components/save-game-dialog/save-game-dialog.component';
import { FriendAddRemoveComponent } from './components/friends-view/friend-add-remove/friend-add-remove.component';
import { FriendsComponent } from './components/friends-view/friends-view/friends.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { SearchBar } from './components/search-bar-component/search-bar';
import { UserMemberSearchComponent } from './components/user-member-search/user-member-search.component';
import { MemberSearchComponent } from './pages/member-search/member-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GameCardComponent } from './components/game-card/game-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchGamesComponent } from './pages/search-games/search-games.component';
import { ListGameSessionComponent } from './pages/list-game-session/list-game-session.component';
import { GameSessionCardComponent } from './components/game-session/game-session-card/game-session-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        AuthComponent,
        LoginFormComponent,
        RegisterFormComponent,
        ProfilPageComponent,
        ResetPasswordComponent,
        ChangeUserFormComponent,
        PictureServerComponent,
        ResetPasswordComponent,
        ChangeProfilPicComponent,
        PasswordFieldComponent,
        ChangePasswordComponent,
        NewPasswordComponent,
        PasswordFieldComponent,
        HeaderComponent,
        ChangePasswordUserFormComponent,
        ChatHomeComponent,
        PageNotFoundComponent,
        MyGamesComponent,
        SaveGameDialogComponent,
        FriendAddRemoveComponent,
        FriendsComponent,
        FriendsPageComponent,
        SearchBar,
        UserMemberSearchComponent,
        MemberSearchComponent,
        GameCardComponent,
        SearchGamesComponent,
        ListGameSessionComponent,
        GameSessionCardComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        HttpClientModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatMenuModule,
        NgxPaginationModule,
        MatDialogModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
