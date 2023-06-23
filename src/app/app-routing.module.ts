import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfilPageComponent } from './pages/profilpage/profil-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PageNotFoundComponent } from './components/not-found/page-not-found.component';
import { ChatHomeComponent } from './components/chat-home/chat-home.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { MyGamesComponent } from './pages/my-games/my-games.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { MemberSearchComponent } from './pages/member-search/member-search.component';
import { SearchGamesComponent } from './pages/search-games/search-games.component';
import {ListPartiesComponent} from "./pages/list-parties/list-parties.component";

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
        path: 'chatHome',
        component: ChatHomeComponent,
    },
    {
        path: 'room/:roomId',
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
      path: 'my-parties',
      component: ListPartiesComponent,
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
