import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

import { Subject } from 'rxjs/Subject';

/** Multilingal Material paginator implementation */
@Injectable()
export class MatPaginatorIntlImpl extends MatPaginatorIntl {

  /** 'of' string */
  private of: string;

  /**
   * Constructor.
   *
   * Sets the labels depending on the {@link LOCALE_ID}
   * @param locale Angulars {@link LOCALE_ID}
   */
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();

    if (locale.startsWith('de')) {
      this.itemsPerPageLabel = 'Einträge pro Seite:';
      this.nextPageLabel = 'Vor';
      this.previousPageLabel = 'Zurück';
      this.firstPageLabel = 'Erste Seite';
      this.lastPageLabel = 'Letzte Seite';
      this.of = 'von';
    } else {
      this.of = 'of';
    }
  }

  /** Uses 'of' for range label. */
  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.of} ${length}`;
    }
    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ` - ${endIndex} ${this.of} ${length}`;
  }
}
