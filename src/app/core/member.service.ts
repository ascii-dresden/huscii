import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import { Member } from '@app/members';

import { CrudRepository } from './crud-repository';
import { Logger } from './logger.service';

/** Member http data service. */
@Injectable()
export class MemberService implements CrudRepository<Member> {

  /** Request url parameter */
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  /** API endpoint */
  private memberUrl = 'api/members';

  /** Member source */
  private memberSource = new Subject<Member>();

  /** Member source as Observable */
  memberSelected$ = this.memberSource.asObservable();

  constructor(private http: HttpClient, private logger: Logger) { }

  /** Trigger observing member source */
  selectMember(member: Member) {
    this.memberSource.next(member);
  }

  /**
   * Returns the amount of members.
   * @returns {numer} Amount of members
   */
  count(): number {
    throw new Error('Method not implemented.');
  }

  /**
   * Deletes the given member.
   * @param {Member | number} entity Member or id of this member
   * @returns {Observable<Member>} Observable of member
  */
  delete(entity: Member | number): Observable<Member> {
    const id = typeof entity === 'number' ? entity : entity.id;
    const url = `${this.memberUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted member w/ id='${id}'`)),
      catchError(this.handleError<Member>(`deleteMember /w id='${id}'`))
    );
  }

  /**
   * Deletes the given members.
   * @param {Member[]} entities Members to delete
   * @returns {Observable<Member[]} Observabel of deleted members
   */
  deleteAll(entities?: Member[]): Observable<Member[]> {
    throw new Error('Method not implemented.');
  }

  /**
   * Returns whether a member exists.
   * @param {Member} entity Member to test for
   * @returns {boolean} Whether a member exits
  */
  exists(entity: Member): boolean {
    throw new Error('Method not implemented.');
  }

  /**
   * Returns all instances of member
   * @param ids IDs to find
   * @returns Observable of members
   */
  findAll(ids?: number[]): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl).pipe(
      tap(() => this.log('fetched members')),
      catchError(this.handleError('getMembers', []))
    );
  }

  /**
   * Retrieves a member by its id.
   * @param id Member id to find
   * @returns Observable of member
   */
  find(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.memberUrl}/${id}`).pipe(
      tap(() => this.log(`fetched member w/ id='${id}'`)),
      catchError(this.handleError<Member>(`getMember w/ id='${id}'`))
    );
  }

  /**
   * Creates a given member.
   * @param entity Member to create
   * @returns Observable of created member
   */
  create(entity: Member): Observable<Member> {
    return this.http.post<Member>(this.memberUrl, entity, this.httpOptions).pipe(
      tap(() => this.log(`added member /w name='${entity.firstName}'`)),
      catchError(this.handleError<Member>(`addMember /w name='${name}'`))
    );
  }

  /**
   * Updates a given member.
   * @param entity Member to update
   * @returns Observable of updated member
   */
  update(entity: Member): Observable<Member> {
    return this.http.put(this.memberUrl, entity, this.httpOptions).pipe(
      tap(() => this.log(`updated member /w id='${entity.id}'`)),
      catchError(this.handleError<any>(`updateMember /w id='${entity.id}'`))
    );
  }

  /** Using {@link Logger} to log into console */
  private log(message: string) {
    this.logger.log(`MemberService: ${message}`);
  }

  /** Handles errors */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
