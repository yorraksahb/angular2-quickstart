import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DatepickerModule } from './datepicker/datepicker.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    DatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
