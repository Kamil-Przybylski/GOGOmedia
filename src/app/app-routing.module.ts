import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.DASHBOARD, pathMatch: 'full' },

  {
    path: AppRoutes.LOGIN,
    canActivate: [LoginGuard],
    component: LoginPageComponent,
  },
  {
    path: AppRoutes.DASHBOARD,
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  { path: AppRoutes.NOT_FOUND, component: NotFoundPageComponent },
  { path: '**', redirectTo: AppRoutes.NOT_FOUND },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
