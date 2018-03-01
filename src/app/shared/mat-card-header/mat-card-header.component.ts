import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  HostBinding
} from '@angular/core';

/** Custom styled mat card header with gray backgroup and custom padding and font sizes */
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

  /** Css class of the component */
  @HostBinding('class.mat-card-header') true;

  /** Constructor. */
  constructor(private ref: ElementRef) { }

  /** Adds a custom css class to its parent component */
  ngAfterViewInit() {
    this.ref.nativeElement.parentElement.classList.add('ascii-card');
  }
}
