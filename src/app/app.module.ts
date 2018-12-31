import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './services/data.service';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// import { Ng4FilesModule } from 'angular4-files-upload';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { FilterComponent } from './search/filter/filter.component';
import { KeyPipe } from './pipes/key.pipe';
import { BsModalModule } from 'ng2-bs3-modal';
import { ModalModule } from 'ngx-bootstrap';
import { Md2AutocompleteModule } from 'md2/autocomplete';

import { RegisterComponent } from './register/index';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './services/auth.guard';
import { HomeGuard } from './services/home.guard';

//import { AgmCoreModule } from '@agm/core'; 
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GeneratePasswordComponent } from './generate-password/generate-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MapFilterComponent } from './map-filter/map-filter.component'; 
import { HRFilterComponent } from './search/hr_filter/hr_filter.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		NavbarComponent,
		HomeComponent,
		SearchComponent,
		AdminComponent,
		KeyPipe,
		FilterComponent,
		RegisterComponent,
		AlertComponent,
		ForgotPasswordComponent,
		GeneratePasswordComponent,
		VerifyEmailComponent,
		FileUploadComponent,
		MapFilterComponent,
		HRFilterComponent
	],

	imports: [
		BrowserModule,
		FileUploadModule,
		BrowserAnimationsModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		MultiselectDropdownModule,
		BsModalModule,
		ModalModule.forRoot(),
		Md2AutocompleteModule,
		AppRoutingModule,
	
		// Ng4FilesModule 
	],
	exports: [FileUploadModule],
	providers: [ DataService, AlertService, AuthGuard, HomeGuard ],
	bootstrap: [AppComponent]
})
export class AppModule { }
