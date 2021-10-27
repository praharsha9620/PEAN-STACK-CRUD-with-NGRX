import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { RegisterComponent } from './register/register.component';
import { AddDataModelComponent } from './add-data-model/add-data-model.component';
import { EditDataModelComponent } from './edit-data-model/edit-data-model.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'details', component: EmployeeComponent,canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'addDetails', component: AddDataModelComponent,canActivate:[AuthGuard]},
  {path: 'editDetails/:id', component: EditDataModelComponent,canActivate:[AuthGuard]},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
