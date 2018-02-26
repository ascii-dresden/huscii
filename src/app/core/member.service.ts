import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Member } from '@app/members';

import { CrudRepository } from './crud-repository';
import { Logger } from './logger.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MemberService implements CrudRepository<Member> {

  constructor(private http: HttpClient, private logger: Logger) { }

  count(): number {
    throw new Error('Method not implemented.');
  }

  delete(entity: Member | number): Observable<Member> {
    const id = typeof entity === 'number' ? entity : entity.id;
    const url = `api/members/${id}`;

    return this.http.delete<Member>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted member w/ id='${id}'`)),
      catchError(this.handleError<Member>(`deleteMember /w id='${id}'`))
    );
  }

  deleteAll(entities?: Member): void {
    throw new Error('Method not implemented.');
  }

  exists(entity: Member): boolean {
    throw new Error('Method not implemented.');
  }

  findAll(ids?: number): Observable<Member[]> {
    return this.http.get<Member[]>('api/members').pipe(
      tap(() => this.log('fetched members')),
      catchError(this.handleError('getMembers', []))
    );
  }

  find(id: number): Observable<Member> {
    return this.http.get<Member>('api/members' + id).pipe(
      tap(() => this.log(`fetched member w/ id='${id}'`)),
      catchError(this.handleError<Member>(`getMember w/ id='${id}'`))
    );
  }

  create(entity: any): Observable<Member> {
    return this.http.post<Member>('api/members', entity, httpOptions).pipe(
      tap(() => this.log(`added member /w name='${entity.firstName}'`)),
      catchError(this.handleError<Member>(`addMember /w name='${name}'`))
    );
  }

  update(entity: Member): Observable<Member> {
    return this.http.put('api/members', entity, httpOptions).pipe(
      tap(() => this.log(`updated member /w id='${entity.id}'`)),
      catchError(this.handleError<any>(`updateMember /w id='${entity.id}'`))
    );
  }

  private log(message: string) {
    this.logger.log(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
