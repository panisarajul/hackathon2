import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
 { path: '', component: LoginComponent },
 { path: 'login', component: LoginComponent },
 { path: 'signup', component: SignupComponent },
 { path: 'upload', component: UploadImageComponent },
 { path: 'followup', component: FollowUpComponent },
 { path: 'home', component: HomeComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);