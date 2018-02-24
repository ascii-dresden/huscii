import { Observable } from 'rxjs/Observable';

import { Identifiable } from './identifiable';

export interface CrudRepository<T extends Identifiable> {

  count(): number;
  delete(entity: T | number): void;
  deleteAll(entities?: T): void;
  exists(entity: T | number): boolean;
  findAll(ids?: number): Observable<T[]>;
  find(id: number): Observable<T>;
  create(entity: any): Observable<T>;
  update(entity: T): Observable<T>;
}
