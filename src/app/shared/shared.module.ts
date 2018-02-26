import { NgModule } from '@angular/core';
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
} from '@angular/material';

import { MatCardHeaderComponent } from './mat-card-header/mat-card-header.component';

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

    MatCardHeaderComponent
  ],
  declarations: [
    MatCardHeaderComponent
  ]
})
export class SharedModule { }
