import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { HomeGuard } from './services/home.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/index';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GeneratePasswordComponent } from './generate-password/generate-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MapFilterComponent } from './map-filter/map-filter.component'; 


const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full'},
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
	{ path: 'admin', component: AdminComponent, canActivate: [HomeGuard] },
	{ path: 'register', component: RegisterComponent },
	{ path:'forgot-password', component: ForgotPasswordComponent },
	{ path:'generate-password', component: GeneratePasswordComponent },
	{ path:'verify-email', component: VerifyEmailComponent },
	{ path:'file-upload', component: FileUploadComponent, canActivate: [HomeGuard] },
	{ path:'map-filter', component: MapFilterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],  
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
