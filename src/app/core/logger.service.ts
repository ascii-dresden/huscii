import { Injectable, ErrorHandler } from '@angular/core';

import { environment } from '@env/environment';


@Injectable()
export class Logger {

  constructor(private errorHandler: ErrorHandler) { }

  log(value: any, ...rest: any[]): void {
    if (!environment.production) {
      console.log(value, ...rest);
    }
  }

  warn(value: any, ...rest: any[]): void {
    if (!environment.production) {
      console.warn(value, ...rest);
    }
  }

  error(value: any, ...rest: any[]): void {
    const message = [value, ...rest].join(' ');
    this.errorHandler.handleError(message);
  }
}
