import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
// tslint:disable-next-line: import-spacing
import { AdminGuard } from  './admin/admin.guard';
import { InstruGuard } from './guards/instru.guard';
import { GuardaGuard } from './guards/guarda.guard';
import { GuardLoginGuard } from './loginGuarda/guard-login.guard';


const routes: Routes = [
  { path: '', component: LoginComponent , canActivate:[GuardLoginGuard]},
  {
    path: 'inicioAdmin',
    component: InicioAdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'registerUserAdmin',
    component: RegisterUserAdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'consultUserAdmin',
    component: ConsultUserAdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'registerRoomAdmin',
    component: RegisterRoomAdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'consultRoomAdmin',
    component: ConsultRoomAdminComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'inicioSegurityG',
    component: InicioSecurityGComponent,
    canActivate: [GuardaGuard],
  },
  {
    path: 'consultInfoRoomSegurityG',
    component: ConsultInfoRoomSecurityGComponent,
    canActivate: [GuardaGuard],
  },
  {
    path: 'registerChangeSegurityG',
    component: RegisterChangeSecurityGComponent,
    canActivate: [GuardaGuard],
  },
  {
    path: 'consultChangeSegurityG',
    component: ConsultChangeSecurityGComponent,
    canActivate: [GuardaGuard],
  },

  {
    path: 'inicioInstru',
    component: InicioInstruComponent,
    canActivate: [InstruGuard],
  },
  {
    path: 'reportNewsInstru',
    component: ReportNewsInstruComponent,
    canActivate: [InstruGuard],
  },
  {
    path: 'consultRoomInstru',
    component: ConsultRoomInstruComponent,
    canActivate: [InstruGuard],
  },
  {
    path: 'passKeyInstru',
    component: PassKeyInstruComponent,
    canActivate: [InstruGuard],
  },
  { path: 'profile', component: ProfileComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
