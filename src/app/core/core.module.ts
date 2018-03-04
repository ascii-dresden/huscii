import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { environment } from '@env/environment';

import { Logger } from './logger.service';
import { InMemoryDatabase } from './in-mem-database.service';
import { MemberService } from './member.service';
import { CashBookService } from './cash-book.service';
import { EmitterService } from './emitter.service';

/** CodeModule contains all general singelton services and modules. */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forFeature(InMemoryDatabase),
  ],
  providers: [
    Logger,
    EmitterService,
    MemberService,
    CashBookService,
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
