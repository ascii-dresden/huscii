import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,

    CoreModule,
    SharedModule,

    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
