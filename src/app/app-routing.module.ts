import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfilPageComponent } from './pages/profilpage/profil-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import {MemberSearchComponent} from "./pages/member-search/member-search.component";

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
    { path: 'MyFriends', component: FriendsPageComponent },
  { path: 'MemberSearch', component: MemberSearchComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
