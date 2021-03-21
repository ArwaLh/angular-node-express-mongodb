import { ViewContactComponent } from './components/contact/view-contact/view-contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { AddContactComponent } from './components/contact/add-contact/add-contact.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './layouts/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: AddContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: ViewContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'contacts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
