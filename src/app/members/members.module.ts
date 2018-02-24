import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MembersRoutingModule } from './members-routing.module';

import { MembersComponent, AddEditMemberDialogComponent } from './members.component';

@NgModule({
  imports: [
    SharedModule,
    MembersRoutingModule,
  ],
  declarations: [
    MembersComponent,
    AddEditMemberDialogComponent,
  ],
  entryComponents: [AddEditMemberDialogComponent]
})
export class MembersModule { }
