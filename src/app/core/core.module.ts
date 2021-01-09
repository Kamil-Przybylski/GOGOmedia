import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-page/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MockedHttpClient } from '../../mocked-api/mocked-api';

@NgModule({
  declarations: [
    LoginPageComponent,
    NotFoundPageComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    // mocked API
    { provide: HttpClient, useClass: MockedHttpClient }
  ],
})
export class CoreModule {}
