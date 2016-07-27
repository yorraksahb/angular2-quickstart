import { Component, Inject } from '@angular/core';
import { NgSwitchCase, NgSwitch } from '@angular/common';
import { DayPickerComponent } from './bs-day-picker.component';
import { MonthPickerComponent } from './bs-month-picker.component';
import { YearPickerComponent } from './bs-year-picker.component';
import { DatePickerService } from './bs-date-picker.service';
import { DatePickerOptions } from './bs-date-picker-options.provider';
import { DateTimePickerComponent } from './bs-date-time-picker.component';
import { CurrentDateComponent } from './bs-current-date.component';
import { CustomRangePickerComponent } from './bs-custom-range-picker';

@Component({
  selector: 'bs-datepicker',
  exportAs: 'bs-datepicker',
  templateUrl: './bs-date-picker.html',
  directives: [DayPickerComponent, MonthPickerComponent, YearPickerComponent,
    DateTimePickerComponent, CurrentDateComponent, CustomRangePickerComponent,
    NgSwitch, NgSwitchCase],
  providers: [DatePickerService, DatePickerOptions],
  moduleId: module.id
})
export class DatePickerComponent {
// here will be parsed options and set defaults
  public options:DatePickerOptions;

  public constructor(@Inject(DatePickerOptions) datePickerOptions:DatePickerOptions) {
    this.options = datePickerOptions;
  }
}
