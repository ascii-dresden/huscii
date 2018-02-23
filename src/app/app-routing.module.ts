import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: 'members', loadChildren: 'app/members/members.module#MembersModule' },
  { path: '**', redirectTo: 'members' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
