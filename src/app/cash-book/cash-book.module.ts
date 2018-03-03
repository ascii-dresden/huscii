import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { CashBookRoutingModule } from './cash-book-routing.module';
import { CashBookComponent } from './cash-book.component';

/** Lazy loading cash book module. */
@NgModule({
  imports: [
    SharedModule,
    CashBookRoutingModule,
  ],
  declarations: [
    CashBookComponent
  ]
})
export class CashBookModule { }
