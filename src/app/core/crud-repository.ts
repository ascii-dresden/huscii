import { Observable } from 'rxjs/Observable';

/** The classical Spring-like CrudRepository interface. Every http data service shold include this interface */
export interface CrudRepository<T> {

  /** Returns the number of entities available */
  count(): number;

  /** Deletes a given entity */
  delete(entity: T | number): void;

  /** Deletes either all or given entities */
  deleteAll(entities?: T): void;

  /** Returns whether an entity exists */
  exists(entity: T | number): boolean;

  /** Returns all instances of the type */
  findAll(ids?: number): Observable<T[]>;

  /** Retrieves an entity by its id */
  find(id: number): Observable<T>;

  /** Creates a given entity */
  create(entity: any): Observable<T>;

  /** Updates a given entity */
  update(entity: T): Observable<T>;
}
