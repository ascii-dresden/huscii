import { Component, Input } from '@angular/core';

import { BusinessDay } from './business-day';
import { environment } from '@env/environment.prod';

@Component({
  selector: 'ascii-business-day',
  template: `
  <div class="clearfix p-1 pb-3">
  <mat-card>
    <mat-card-header>
      <mat-card-title>{{ item.date | date:'fullDate' }}</mat-card-title>
      <mat-card-subtitle i18n>
        Balance PM: <strong>{{ item.balancePM / 100 | currency:currencyCode }}</strong>
      </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <table class="table table-sm">
        <thead>
          <tr>
            <th>{{ 100 | currency:currencyCode }}</th>
            <th>{{ 50 | currency:currencyCode }}</th>
            <th>{{ 20 | currency:currencyCode }}</th>
            <th>{{ 10 | currency:currencyCode }}</th>
            <th>{{ 5 | currency:currencyCode }}</th>
            <th>{{ 2 | currency:currencyCode }}</th>
            <th>{{ 1 | currency:currencyCode }}</th>
            <th>{{ 0.5 | currency:currencyCode }}</th>
            <th>{{ 0.2 | currency:currencyCode }}</th>
            <th>{{ 0.1 | currency:currencyCode }}</th>
            <th>{{ 0.05 | currency:currencyCode }}</th>
            <th>{{ 0.02 | currency:currencyCode }}</th>
            <th>{{ 0.01 | currency:currencyCode }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ item.hundered.amount }}</td>
            <td>{{ item.fifty.amount }}</td>
            <td>{{ item.twenty.amount }}</td>
            <td>{{ item.ten.amount }}</td>
            <td>{{ item.five.amount }}</td>
            <td>{{ item.two.amount }}</td>
            <td>{{ item.one.amount }}</td>
            <td>{{ item.half.amount }}</td>
            <td>{{ item.fifth.amount }}</td>
            <td>{{ item.tenth.amount }}</td>
            <td>{{ item.twentieth.amount }}</td>
            <td>{{ item.fiftieth.amount }}</td>
            <td>{{ item.hundredth.amount }}</td>
          </tr>
        </tbody>
      </table>
    </mat-card-content>
  </mat-card>
  </div>
  `
})
export class BusinessDayComponent {

  @Input() item: BusinessDay;
  @Input() currencyCode: string;
}
