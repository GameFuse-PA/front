import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import {ProfilPageComponent} from "./pages/profilpage/profil-page.component";
import { AuthComponent } from './pages/auth/auth.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'profil',
    component: ProfilPageComponent
    },
    {
        path: 'newPassword',
        component: NewPasswordComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
