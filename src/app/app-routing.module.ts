import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfilPageComponent } from './pages/profilpage/profil-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import {PageNotFoundComponent} from "./components/not-found/page-not-found.component";
import {ChatHomeComponent} from "./components/home/chat-home.component";
import { NewPasswordComponent } from './pages/new-password/new-password.component';

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
    component: AuthComponent
  },
  {
    path: 'chatHome',
    component: ChatHomeComponent
  },
  {
    path: 'call/:roomId',
    loadChildren: () => import('./modules/call/call.module').then(c => c.CallModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
