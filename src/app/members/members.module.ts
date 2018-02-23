import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MembersRoutingModule } from './members-routing.module';

import { MembersComponent } from './members.component';

@NgModule({
  imports: [
    SharedModule,
    MembersRoutingModule,
  ],
  declarations: [MembersComponent],
})
export class MembersModule { }
