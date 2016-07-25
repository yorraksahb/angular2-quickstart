import { Component } from '@angular/core';
import * as moment from 'moment';
import { DatePickerBase } from './bs-datepicker-base.class';
import { DatePickerService } from './bs-datepicker.service';
import { DatePickerOptions } from './bs-datepicker-options.provider';

@Component({
  selector: 'bs-daypicker',
  exportAs: 'bs-daypicker',
  templateUrl: './bs-daypicker.html',
  moduleId: module.id
})
export class DayPickerComponent extends DatePickerBase {
  // title in the head
  public title:string;
  // weeks numbers
  public weeks:string[];
  // days matrix
  public calendar:number[][];
  // locale options
  public locale:any;

  public constructor(datePickerService:DatePickerService, options: DatePickerOptions) {
    super(datePickerService, options);
  }

  public refresh(currentDay:any):void {
    const calendarMatrix = this.getDaysCalendarMatrix(currentDay, this.options);
    this.weeks = calendarMatrix.weeks;
    this.calendar = calendarMatrix.calendar;
    this.locale = calendarMatrix.locale;
    this.title = currentDay.clone().format('MMM YYYY');
  }
}
