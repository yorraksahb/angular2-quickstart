import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CurrentDateComponent } from './current-date/bs-current-date.component';
import { CustomRangePickerComponent } from './custom-range/bs-custom-range-picker.component';
import { DayPickerComponent } from './day/bs-day-picker.component';
// import { DatePickerNgModel } from './forms/bs-date-picker-ng-model';
import { MonthPickerComponent } from './month/bs-month-picker.component';
import { DateTimePickerComponent } from './time/bs-date-time-picker.component';
import { YearPickerComponent } from './year/bs-year-picker.component';
import { DatePickerViewComponent } from './bs-date-picker-view.component';
import { DatePickerComponent } from './bs-date-picker.component';
import { CalendarOptionsClass } from './common/bs-calendar-options.provider';
import { DatePickerOptions } from './common/bs-date-picker-options.provider';
import { DatePickerState } from './common/bs-date-picker-state.provider';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CurrentDateComponent,
    CustomRangePickerComponent,
    DayPickerComponent,
    // DatePickerNgModel,
    MonthPickerComponent,
    DateTimePickerComponent,
    YearPickerComponent,
    DatePickerViewComponent,
    DatePickerComponent
  ],
  exports: [
    CurrentDateComponent,
    CustomRangePickerComponent,
    DayPickerComponent,
    // DatePickerNgModel,
    MonthPickerComponent,
    DateTimePickerComponent,
    YearPickerComponent,
    DatePickerViewComponent,
    DatePickerComponent
  ],
  providers: [CalendarOptionsClass, DatePickerOptions, DatePickerState]
})
export class DatepickerModule {
}
