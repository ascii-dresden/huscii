import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// const APP_ROUTES: Routes = [ <- This breaks compodoc generation
/** Application routes */
const APP_ROUTES = [
  { path: '', redirectTo: 'cash-book', pathMatch: 'full' },
  { path: 'members', loadChildren: 'app/members/members.module#MembersModule' },
  { path: 'cash-book', loadChildren: 'app/cash-book/cash-book.module#CashBookModule' },
  { path: '**', redirectTo: 'cash-book' },
];

/** Application routes module */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
