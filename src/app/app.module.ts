import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { InicioAdminComponent } from './inicio-admin/inicio-admin.component';
import { RegisterUserAdminComponent } from './register-user-admin/register-user-admin.component';
import { ConsultUserAdminComponent } from './consult-user-admin/consult-user-admin.component';
import { RegisterRoomAdminComponent } from './register-room-admin/register-room-admin.component';
import { ConsultRoomAdminComponent } from './consult-room-admin/consult-room-admin.component';
import { InicioSecurityGComponent } from './inicio-security-g/inicio-security-g.component';
import { ConsultInfoRoomSecurityGComponent } from './consult-info-room-security-g/consult-info-room-security-g.component';
import { RegisterChangeSecurityGComponent } from './register-change-security-g/register-change-security-g.component';
import { ConsultChangeSecurityGComponent } from './consult-change-security-g/consult-change-security-g.component';
import { InicioInstruComponent } from './inicio-instru/inicio-instru.component';
import { ReportNewsInstruComponent } from './report-news-instru/report-news-instru.component';
import { ConsultRoomInstruComponent } from './consult-room-instru/consult-room-instru.component';
import { PassKeyInstruComponent } from './pass-key-instru/pass-key-instru.component';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    InicioAdminComponent,
    RegisterUserAdminComponent,
    ConsultUserAdminComponent,
    RegisterRoomAdminComponent,
    ConsultRoomAdminComponent,
    InicioSecurityGComponent,
    ConsultInfoRoomSecurityGComponent,
    RegisterChangeSecurityGComponent,
    ConsultChangeSecurityGComponent,
    InicioInstruComponent,
    ReportNewsInstruComponent,
    ConsultRoomInstruComponent,
    PassKeyInstruComponent,
    ProfileComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
