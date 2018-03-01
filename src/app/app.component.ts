import { Component } from '@angular/core';

/** Applications root component */
@Component({
  selector: 'ascii-root',
  templateUrl: './app.component.html',
  styles: [`
  #ascii-title a {
    color: #FFFFFF;
    text-decoration: none;
  }
  #ascii-title a:hover {
    color: inherit;
    text-decoration: none;
  }
  .fill {
    flex: 1 1 auto;
  }
  `]
})
export class AppComponent { }
