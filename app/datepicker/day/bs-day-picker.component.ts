import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';
import { DatePickerDate } from '../common/date-picker-date.class';
import * as moment from 'moment';
import { CalendarOptionsClass } from '../common/bs-calendar-options.provider';

@Component({
  selector: 'bs-day-picker',
  exportAs: 'bs-day-picker',
  templateUrl: './bs-day-picker.html',
  moduleId: module.id
})
export class DayPickerComponent extends DatePickerBase {
  // days matrix
  public calendar:DatePickerDate[][];
  // title in the head
  public viewMonth:string;
  public viewYear:string;
  // weeks numbers
  public weeks:number[];

  // locale options
  public locale:any;

  private cOptions:CalendarOptionsClass;

  public constructor(datePickerState:DatePickerState, options:DatePickerOptions, cOptions:CalendarOptionsClass) {
    super(datePickerState, options);
    this.cOptions = cOptions;
    this.refresh(datePickerState.viewDate);
  }

  public refresh(_viewDate:any):void {
    if (!this.cOptions) {
      return;
    }

    if (this.options.viewMode !== 'days') {
      return;
    }

    let viewDate = _viewDate;
    if (this.cOptions.isRight) {
      viewDate = _viewDate.clone().add(this.cOptions.offset, 'months');
    }

    this.calendar = this.getDaysCalendarMatrix(viewDate);
    this.weeks = this.getWeeksNumbers();
    this.locale = this.getLocale();
    this.viewMonth = moment(viewDate).format(this.options.format.monthTitle);
    this.viewYear = moment(viewDate).format(this.options.format.yearTitle);
  }
}
