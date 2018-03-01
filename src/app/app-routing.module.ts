import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// const APP_ROUTES: Routes = [ <- This breaks compodoc generation
/** Application routes */
const APP_ROUTES = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: 'members', loadChildren: 'app/members/members.module#MembersModule' },
  { path: '**', redirectTo: 'members' },
];

/** Application routes module */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
