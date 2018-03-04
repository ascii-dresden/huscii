import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { CashBookService } from '@app/core';
import { environment } from '@env/environment';

import { BusinessDay } from './business-day';

@Component({
  selector: 'ascii-cash-book',
  templateUrl: './cash-book.component.html',
  styles: []
})
export class CashBookComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Subscriptions */
  private _sub = new Subscription();

  /** Fetched cash book */
  cashBook: BusinessDay[] = [];

  /** Displayed columns in member table */
  displayedColumns = ['date', 'balanceAM', 'balancePM'];

  /** Member table data source */
  dataSource = new MatTableDataSource<BusinessDay>(this.cashBook);

  /** Selected member from the table */
  selectedDay: BusinessDay;

  /** Sort property */
  @ViewChild(MatSort) sort: MatSort;

  /** Paginator property */
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  selectMember(day: BusinessDay | undefined) {
    this.selectedDay = day;
  }

  /** Gets cash book from the http data service */
  private getCashBook() {
    this.service.findAll().subscribe(data => {
      this.cashBook = data;
      this.dataSource.data = data;
    });
  }
}
