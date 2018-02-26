import { EventEmitter, Injectable } from '@angular/core';

/**
 * To avoid unnecessary property and event bindings between your sibling or cousin components use EmitterService.
 * _emitters stores all EventEmitters you want.
 *
 * Just define a unique id in your parent component and pass
 * it via property binding to its child components. Or simply use the id to get the needed
 * EventEmitter. Emit and subscribe events like you use it via @Output event binding.
 */
@Injectable()
export class EmitterService {

  private static _emitters: { [ID: string]: EventEmitter<any> } = {};

  static get(ID: string): EventEmitter<any> {
    if (!this._emitters[ID]) {
      this._emitters[ID] = new EventEmitter();
    }
    return this._emitters[ID];
  }
}
