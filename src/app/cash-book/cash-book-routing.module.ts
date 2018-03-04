import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashBookComponent } from './cash-book.component';

// const CASH_BOOK_ROUTES: Routes = [ <- This breaks compodoc generation
/** Cash book module routes */
const CASH_BOOK_ROUTES = [
  { path: '', component: CashBookComponent },
];

/** Lazy loading cash book routes module */
@NgModule({
  imports: [RouterModule.forChild(CASH_BOOK_ROUTES)],
  exports: [RouterModule]
})
export class CashBookRoutingModule { }