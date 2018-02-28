import { Injectable, ErrorHandler } from '@angular/core';

import { environment } from '@env/environment';

/** A default console logger */
@Injectable()
export class Logger {

  constructor(private errorHandler: ErrorHandler) { }

  /** Logs any data to the console */
  log(value: any, ...rest: any[]): void {
    if (!environment.production) {
      console.log(value, ...rest);
    }
  }

  /** Logs any warnings to the console */
  warn(value: any, ...rest: any[]): void {
    if (!environment.production) {
      console.warn(value, ...rest);
    }
  }

  /** Logs any error to the console by using Angulars ErrorHandler class */
  error(value: any, ...rest: any[]): void {
    const message = [value, ...rest].join(' ');
    this.errorHandler.handleError(message);
  }
}
