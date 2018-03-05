import { NgModule, LOCALE_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule,
  MatSortModule,
  MatCardModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatDividerModule,
  MatPaginatorIntl,
} from '@angular/material';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { MatPaginatorIntlImpl } from './mat-paginator-intl-impl';
import { MatCardHeaderComponent } from './mat-card-header/mat-card-header.component';

/**
 * All the “dumb” components and pipes are implemented here.
 * These components don’t import and inject services from core or other features in their constructors.
 * They should receive all data though attributes in the template of the component using them.
 * This all sums up to the fact that SharedModule doesn’t have any dependency to the rest of our application.
 *
 * It is also the perfect place to import and re-export Angular Material components.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDividerModule,
    VirtualScrollModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDividerModule,
    VirtualScrollModule,

    MatCardHeaderComponent,
  ],
  declarations: [
    MatCardHeaderComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlImpl }
  ]
})
export class SharedModule { }
