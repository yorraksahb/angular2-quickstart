import { Component } from '@angular/core';
import { DatePickerBase } from './bs-date-picker-base.class';
import { DatePickerService } from './bs-date-picker.service';
import { DatePickerOptions } from './bs-date-picker-options.provider';
import { DatePickerDate } from './date-picker-date.class';

import * as moment from 'moment';

@Component({
  selector: 'bs-daypicker',
  exportAs: 'bs-daypicker',
  templateUrl: './bs-day-picker.html',
  moduleId: module.id
})
export class DayPickerComponent extends DatePickerBase {
  // title in the head
  public viewMonth:string;
  public viewYear:string;
  // weeks numbers
  public weeks:string[];
  // days matrix
  public calendar:DatePickerDate[][];
  // locale options
  public locale:any;

  public constructor(datePickerService:DatePickerService, options:DatePickerOptions) {
    super(datePickerService, options);
    datePickerService.activeDateChange.subscribe(() => {this.markActive();});
    datePickerService.selectedDateChange.subscribe(() => {this.markSelected();});
    datePickerService.selectedEndDateChange.subscribe(() => {
      this.markSelected();
      this.markActive();
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
    // this.title = currentDay.format('MMM YYYY');
    this.viewMonth = moment(currentDay).format(this.options.format.monthTitle);
    this.viewYear = moment(currentDay).format(this.options.format.yearTitle);
  }

  public markActive():void {
    // mark proper dates as active
    for (let i = 0; i < this.calendar.length; i++) {
      for (let j = 0; j < this.calendar[i].length; j++) {
        this.calendar[i][j].isActive = this.calendar[i][j].isSelected !== true &&
          this.isActive(this.calendar[i][j].date);
      }
    }
  }

  public markSelected(): void {
    // mark proper dates as selected
    for (let i = 0; i < this.calendar.length; i++) {
      for (let j = 0; j < this.calendar[i].length; j++) {
        const isSelected = this.isSelected(this.calendar[i][j].date);
        this.calendar[i][j].isSelected = isSelected;
        if (isSelected) {
          this.calendar[i][j].isActive = false;
        }
      }
    }
  }
}
