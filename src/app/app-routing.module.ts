import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'dashboard', component: DashboardComponent},
    {path: 'login', component: LoginComponent}
  ]),],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
