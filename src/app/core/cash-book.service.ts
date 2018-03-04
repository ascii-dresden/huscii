import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import { BusinessDay } from '@app/cash-book';

import { CrudRepository } from './crud-repository';
import { Logger } from './logger.service';

@Injectable()
export class CashBookService implements CrudRepository<BusinessDay> {

  /** Request url parameter */
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  /** API endpoint */
  private cashBookUrl = 'api/cashbook';

  /** BusinessDay source */
  private businessDaySource = new Subject<BusinessDay>();

  /** BusinessDay source as Observable */
  businessDaySelected$ = this.businessDaySource.asObservable();

  constructor(private http: HttpClient, private logger: Logger) { }

  /** Trigger observing businessDay source */
  selectBusinessDay(businessDay: BusinessDay) {
    this.businessDaySource.next(businessDay);
  }

  count(): number {
    throw new Error('Method not implemented.');
  }

  delete(entity: BusinessDay): Observable<BusinessDay> {
    throw new Error('Method not implemented.');
  }

  deleteAll(entities?: BusinessDay[]): Observable<BusinessDay[]> {
    throw new Error('Method not implemented.');
  }

  exists(entity: BusinessDay): boolean {
    throw new Error('Method not implemented.');
  }

  findAll(ids?: number[]): Observable<BusinessDay[]> {
    return this.http.get<BusinessDay[]>(this.cashBookUrl).pipe(
      tap(() => this.log('fetched cash book')),
      catchError(this.handleError('getCashBook', []))
    );
  }

  find(id: number): Observable<BusinessDay> {
    throw new Error('Method not implemented.');
  }

  create(entity: BusinessDay): Observable<BusinessDay> {
    throw new Error('Method not implemented.');
  }

  update(entity: BusinessDay): Observable<BusinessDay> {
    throw new Error('Method not implemented.');
  }

  /** Using {@link Logger} to log into console */
  private log(message: string) {
    this.logger.log(`CashBookService: ${message}`);
  }

  /** Handles errors */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
