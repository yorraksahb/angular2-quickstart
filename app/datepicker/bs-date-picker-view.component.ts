import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgSwitchCase, NgSwitch } from '@angular/common';
import { DayPickerComponent } from './day/bs-day-picker.component';
import { MonthPickerComponent } from './month/bs-month-picker.component';
import { YearPickerComponent } from './year/bs-year-picker.component';
import { DatePickerOptions } from './common/bs-date-picker-options.provider';
import { DateTimePickerComponent } from './time/bs-date-time-picker.component';
import { CurrentDateComponent } from './current-date/bs-current-date.component';
import { CustomRangePickerComponent } from './custom-range/bs-custom-range-picker.component';
import { CalendarOptionsClass } from './common/bs-calendar-options.provider';

@Component({
  selector: 'bs-date-picker-view',
  exportAs: 'bs-date-picker-view',
  templateUrl: './bs-date-picker-view.html',
  directives: [DayPickerComponent, MonthPickerComponent, YearPickerComponent,
    DateTimePickerComponent, CurrentDateComponent, CustomRangePickerComponent,
    NgSwitch, NgSwitchCase],
  providers: [CalendarOptionsClass],
  moduleId: module.id
})
export class DatePickerViewComponent implements OnInit {
  public options:DatePickerOptions;
  public cOptions: CalendarOptionsClass;
  @Input() public bsRole:string;

  public constructor(datePickerOptions:DatePickerOptions, cOptions: CalendarOptionsClass) {
    this.options = datePickerOptions;
    this.cOptions = cOptions;
  }

  public ngOnInit():void {
    this.cOptions.update({
      bsRole: this.bsRole
    });
  }
}
