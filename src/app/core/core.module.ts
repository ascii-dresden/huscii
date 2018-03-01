import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { environment } from '@env/environment';

import { Logger } from './logger.service';
import { MemberInMemDataService } from './member-in-mem-data.service';
import { MemberService } from './member.service';
import { EmitterService } from './emitter.service';

/** CodeModule contains all general singelton services and modules. */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forFeature(MemberInMemDataService),
  ],
  providers: [
    Logger,
    EmitterService,
    MemberService
  ]
})
export class CoreModule {

  // Make sure CoreModule is only imported once.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded.');
    }
  }
}
