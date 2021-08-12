import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import('./components/meus-pagamentos/meus-pagamentos.module').then(m => m.MeusPagamentosModule), canActivate: [AuthGuard]
  },
  {
    path: 'login', loadChildren: () =>
      import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**', loadChildren: () =>
      import('./components/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }