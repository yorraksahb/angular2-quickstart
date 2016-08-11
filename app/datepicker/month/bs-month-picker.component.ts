import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';
import * as moment from 'moment';

@Component({
  selector: 'bs-month-picker',
  exportAs: 'bs-month-picker',
  moduleId: module.id,
  templateUrl: './bs-month-picker.html'
})
export class MonthPickerComponent extends DatePickerBase {
  public calendar:any[][];
  public title:string;

  public constructor(datePickerService:DatePickerState, options:DatePickerOptions) {
    super(datePickerService, options);
  }

  public refresh(viewDate:moment.Moment):void {
    if (this.options.viewMode !== 'months') {
      return;
    }
    this.title = viewDate.format(this.options.format.yearTitle);
    this.calendar = this.getMonthsCalendarMatrix(viewDate);
  }
}
