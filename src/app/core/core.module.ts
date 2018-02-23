import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Logger } from './logger.service';
import { EmitterService } from './emitter.service';
import { MemberService } from './member.service';

/** CodeModule contains all general singelton services and modules. */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    Logger,
    EmitterService,
    MemberService
  ],
  declarations: []
})
export class CoreModule {

  // Make sure CoreModule is only imported once.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded.');
    }
  }
}
