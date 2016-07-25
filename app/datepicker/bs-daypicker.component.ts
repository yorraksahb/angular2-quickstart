import { Component } from '@angular/core';
import * as moment from 'moment';
import { DatePickerBase } from './bs-datepicker-base.class';
import { DatePickerService } from './bs-datepicker.service';
import { DatePickerOptions } from './bs-datepicker-options.provider';
import { DatePickerDate } from './DatePickerDate.class';

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
  public calendar:DatePickerDate[][];
  // locale options
  public locale:any;

  public constructor(datePickerService:DatePickerService, options: DatePickerOptions) {
    super(datePickerService, options);
    datePickerService.activeDateChange.debounceTime(150).subscribe((activeDate) => {
      this.markActive(activeDate);
    });
  }

  public refresh(currentDay:any):void {
    if (this.options.viewMode !== 'days') {
      return;
    }

    const calendarMatrix = this.getDaysCalendarMatrix(currentDay, this.options);
    this.calendar = calendarMatrix.calendar;
    this.weeks = calendarMatrix.weeks;
    this.locale = calendarMatrix.locale;
    this.title = currentDay.format('MMM YYYY');
  }

  public markActive(activeDate:any):void {
    if (!activeDate) {
      // mark all is inactive
      for (let i = 0; i < this.calendar.length; i++) {
        for (let j = 0; j < this.calendar[i].length; j++) {
          this.calendar[i][j].isActive = false;
        }
      }
      return;
    }

    // mark proper dates as active
    for (let i = 0; i < this.calendar.length; i++) {
      for (let j = 0; j < this.calendar[i].length; j++) {
        this.calendar[i][j].isActive = this.isActive(this.calendar[i][j].date);
      }
    }
  }
}
