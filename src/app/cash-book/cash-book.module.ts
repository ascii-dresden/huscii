import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { CashBookRoutingModule } from './cash-book-routing.module';
import { CashBookComponent } from './cash-book.component';
import { BusinessDayComponent } from './business-day.component';
import { AddBusinessDayComponent } from './new/add-business-day.component';

/** Lazy loading cash book module. */
@NgModule({
  imports: [
    SharedModule,
    CashBookRoutingModule,
  ],
  declarations: [
    CashBookComponent,
    BusinessDayComponent,
    AddBusinessDayComponent,
  ]
})
export class CashBookModule { }
