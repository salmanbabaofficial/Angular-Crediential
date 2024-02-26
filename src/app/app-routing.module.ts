import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GoogleDashboardComponent } from './google-dashboard/google-dashboard.component';
import { FacebookDashboardComponent } from './facebook-dashboard/facebook-dashboard.component';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'editUser', component: EditUserComponent },
  { path: 'googleDashboard', component: GoogleDashboardComponent },
  { path: 'facebookDashboard', component: FacebookDashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
