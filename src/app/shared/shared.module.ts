import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
