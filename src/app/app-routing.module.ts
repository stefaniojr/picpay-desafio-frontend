import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import('./components/meus-pagamentos/meus-pagamentos.module').then(m => m.MeusPagamentosModule), canActivate: [AuthGuard]
  },
  {
    path: 'login', loadChildren: () =>
      import('./components/login/login.module').then(m => m.LoginModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }