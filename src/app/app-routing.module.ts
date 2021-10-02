import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MachineCreateComponent } from './machines/machine-create/machine-create.component';
import { MachineListComponent } from './machines/machine-list/machine-list.component';

const routes: Routes = [
  { path: '', component: MachineListComponent },
  {
    path: 'create',
    component: MachineCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: MachineCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
