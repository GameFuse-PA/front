import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfilPageComponent } from './pages/profilpage/profil-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PageNotFoundComponent } from './components/not-found/page-not-found.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { MyGamesComponent } from './pages/my-games/my-games.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { MemberSearchComponent } from './pages/member-search/member-search.component';
import { SearchGamesComponent } from './pages/search-games/search-games.component';
import { ListGameSessionComponent } from './pages/list-game-session/list-game-session.component';
import { InvitationsComponent } from './pages/invitations/invitations.component';
import { MyInvitationsComponent } from './components/my-invitations/my-invitations.component';
import { RoomComponent } from './components/game-session/room/room.component';

const routes: Routes = [
    {
        path: '',
        component: HomepageComponent,
    },
    {
        path: 'auth',
        component: AuthComponent,
    },
    {
        path: 'profil',
        component: ProfilPageComponent,
    },
    {
        path: 'newPassword',
        component: NewPasswordComponent,
    },
    {
        path: '',
        component: HomepageComponent,
    },
    {
        path: 'auth',
        component: AuthComponent,
    },
    {
        path: 'room/:roomId',
        component: RoomComponent,
        loadChildren: () => import('./modules/call/call.module').then((c) => c.CallModule),
    },
    {
        path: 'my-games',
        component: MyGamesComponent,
    },
    {
        path: 'MyFriends',
        component: FriendsPageComponent,
    },
    {
        path: 'member-search',
        component: MemberSearchComponent,
    },
    {
        path: 'search-games',
        component: SearchGamesComponent,
    },
    {
        path: 'my-game-sessions',
        component: ListGameSessionComponent,
    },
    {
        path: 'invitation',
        component: InvitationsComponent,
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
