import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MembersRoutingModule } from './members-routing.module';

import { MembersComponent } from './members.component';
import { MemberDetailsComponent } from './member-details.component';
import { AddEditMemberDialogComponent } from './add-edit-member-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MembersRoutingModule,
  ],
  declarations: [
    MembersComponent,
    MemberDetailsComponent,
    AddEditMemberDialogComponent,
  ],
  entryComponents: [AddEditMemberDialogComponent]
})
export class MembersModule { }
