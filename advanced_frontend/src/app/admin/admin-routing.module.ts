import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminstoresComponent } from './adminstores/adminstores.component';
import { AdmindeletestoreComponent } from './admindeletestore/admindeletestore.component';
import { AdmindeleteuserComponent } from './admindeleteuser/admindeleteuser.component';

const routes: Routes = [
  { path: 'login', component: AdminloginComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'users', component: AdminUsersComponent },
  {path: 'stores', component: AdminstoresComponent },
  {path: 'deleteuser', component: AdmindeleteuserComponent },
  {path: 'deletestore', component: AdmindeletestoreComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
