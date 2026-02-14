import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellPage } from './shell.page';

const routes: Routes = [
  {
    path: '',
    component: ShellPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule),
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersPageModule),
      },
      {
        path: 'users/:uid',
        loadChildren: () => import('../user-detail/user-detail.module').then(m => m.UserDetailPageModule),
      },
      {
        path: 'speeches',
        loadChildren: () => import('../speeches/speeches.module').then(m => m.SpeechesPageModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
