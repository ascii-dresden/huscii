import { MatPaginatorIntl } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlDe extends MatPaginatorIntl {

  constructor() {
    super();

    this.itemsPerPageLabel = 'Einträge pro Seite:';
    this.nextPageLabel = 'Vor';
    this.previousPageLabel = 'Zurück';
    this.firstPageLabel = 'Erste Seite';
    this.lastPageLabel = 'Letzte Seite';
  }

  getRangeLabel = function (page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return '0 von ' + length;
    }
    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' von ' + length;
  };
}
