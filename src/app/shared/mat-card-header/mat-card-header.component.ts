import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  HostBinding
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ascii-card-header',
  templateUrl: 'mat-card-header.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  .mat-card-title {
    line-height: 40px;
    margin-bottom: 0;
  }

  .mat-card-header .mat-card-title {
    font-size: 1.2rem;
  }

  .ascii-card  ascii-card-header.mat-card-header {
    background: #f5f5f5;
    margin: -24px -24px 0;
    padding: 12px 24px;
  }

  @media screen and (max-width: 599px) {
    .ascii-card  ascii-card-header.mat-card-header {
    margin: -24px -16px 0;
    padding: 12px 16px;
    }
  }
  `]
})
export class MatCardHeaderComponent implements AfterViewInit {

  @HostBinding('class.mat-card-header') true;

  constructor(private ref: ElementRef) { }

  ngAfterViewInit() {
    this.ref.nativeElement.parentElement.classList.add('ascii-card');
  }
}
