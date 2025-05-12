import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';

import { AdminstoresComponent } from './adminstores/adminstores.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdmindeleteuserComponent } from './admindeleteuser/admindeleteuser.component';
import { AdmindeletestoreComponent } from './admindeletestore/admindeletestore.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminloginComponent,
    AdminstoresComponent,
    AdmindeleteuserComponent,
    AdmindeletestoreComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
