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
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './services/request.interceptor';
import { ProfilPageComponent } from './pages/profilpage/profil-page.component';
import { ChangeUserFormComponent } from './components/change-user-form/change-user-form.component';
import { ProfilPictureComponent } from './components/profil-picture/profil-picture.component';
import { ChangeProfilPicComponent } from './components/change-profil-pic/change-profil-pic.component';
import { PasswordFieldComponent } from './components/password-field/password-field.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ChangePasswordUserFormComponent } from './components/change-password-user-form/change-password-user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfilPageComponent,
    ChangeUserFormComponent,
    ProfilPictureComponent,
    ResetPasswordComponent,
    ChangeProfilPicComponent,
    PasswordFieldComponent,
    ChangePasswordUserFormComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        MatProgressBarModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
