import { Component, Inject } from '@angular/core';
import { NgSwitchCase, NgSwitch } from '@angular/common';
import { DayPickerComponent } from './bs-daypicker.component';
import { MonthPickerComponent } from './bs-monthpicker.component';
import { YearPickerComponent } from './bs-yearpicker.component';
import { DatePickerService } from './bs-datepicker.service';
import { DatePickerOptions } from './bs-datepicker-options.provider';

@Component({
  selector: 'bs-datepicker',
  exportAs: 'bs-datepicker',
  templateUrl: './bs-datepicker.html',
  directives: [DayPickerComponent, MonthPickerComponent, YearPickerComponent,
    NgSwitch, NgSwitchCase],
  providers: [DatePickerService, DatePickerOptions],
  moduleId: module.id
})
export class DatePickerComponent {
// here will be parsed options and set defaults
  public options: DatePickerOptions;
  public constructor(@Inject(DatePickerOptions) datePickerOptions:DatePickerOptions) {
    this.options = datePickerOptions;
  }
}
