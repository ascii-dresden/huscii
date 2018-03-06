import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { CashBookService } from '@app/core';
import { environment } from '@env/environment';

import { BusinessDay } from './business-day';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';

@Component({
  selector: 'ascii-cash-book',
  templateUrl: './cash-book.component.html',
  styles: [`
  virtual-scroll {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 650px;
  }
  list-item {
    display: block;
    width: 100%;
  }
  `]
})
export class CashBookComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Subscriptions */
  private _sub = new Subscription();

  /** Fetched cash book */
  cashBook: BusinessDay[];

  /** Displayed columns in member table */
  displayedColumns = ['date', 'balanceAM', 'balancePM'];

  /** Member table data source */
  dataSource = new MatTableDataSource<BusinessDay>(this.cashBook);

  showAdd = true;

  /** Sort property */
  @ViewChild(MatSort) sort: MatSort;

  /** Paginator property */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(VirtualScrollComponent) virtualScroll: VirtualScrollComponent;

  currencyCode = environment.currencyCode;

  constructor(private service: CashBookService) { }

  /** Fetches the cash book */
  ngOnInit() {
    this.getCashBook();
  }

  /** Initializes sort and pagination */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Unsubscribes from all subscriptions */
  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  /** Processes the user input */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /** Selects a day from the table */
  moveTo(day: BusinessDay | undefined) {
    this.virtualScroll.scrollInto(day);
  }

  /** Gets cash book from the http data service */
  private getCashBook() {
    this.service.findAll().subscribe(data => {
      this.cashBook = data;
      this.dataSource.data = data;
      if (environment.production && data) {
        let latestEntry: Date;
        if (typeof data[0].date === 'number') {
          latestEntry = new Date(data[0].date as number);
        } else {
          latestEntry = new Date(data[0].date as string);
        }

        if (latestEntry.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
          this.showAdd = false;
        }
      }
    });
  }
}
