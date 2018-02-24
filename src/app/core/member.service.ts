import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Member } from '@app/members';

import { CrudRepository } from './crud-repository';
import { Logger } from './logger.service';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class MemberService implements CrudRepository<Member> {

  constructor(private http: HttpClient, private logger: Logger) { }

  count(): number {
    throw new Error('Method not implemented.');
  }

  delete(entity: Member | number): void {
    const id = typeof entity === 'number' ? entity : entity.id;

    this.http.delete<Member>('/api/members' + id, cudOptions).pipe(
      tap(() => this.log(`delete member /w id='${id}'`)),
      catchError(this.handleError<Member | number>(`deleteMember /w id='${id}'`, entity))
    );
  }

  deleteAll(entities?: Member): void {
    throw new Error('Method not implemented.');
  }

  exists(entity: Member): boolean {
    throw new Error('Method not implemented.');
  }

  findAll(ids?: number): Observable<Member[]> {
    return this.http.get<Member[]>('/api/members').pipe(
      tap(() => this.log('fetched members form /api/members')),
      catchError(this.handleError<Member[]>('getMembers from /api/members', []))
    );
  }

  find(id: number): Observable<Member> {
    return this.http.get<Member>('/api/members' + id).pipe(
      tap(() => this.log(`fetched member w/ id='${id}'`)),
      catchError(this.handleError<any>(`getMember w/ id='${id}'`, {}))
    );
  }

  create(entity: Member): Observable<Member> {
    throw new Error('Method not implemented.');
  }

  update(entity: Member): Observable<Member> {
    return this.http.post<Member>('/api/members', entity, cudOptions).pipe(
      tap(() => this.log(`added member /w name='${entity.fullName}'`)),
      catchError(this.handleError<any>(`addMember /w name='${entity.fullName}'`, {}))
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
