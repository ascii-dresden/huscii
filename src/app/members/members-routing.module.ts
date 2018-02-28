import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent } from './members.component';

/** Member module routes */
const MEMBER_ROUTES: Routes = [
  { path: '', component: MembersComponent },
];

/** Lazy loading member routes module */
@NgModule({
  imports: [RouterModule.forChild(MEMBER_ROUTES)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
