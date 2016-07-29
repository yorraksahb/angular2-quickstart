import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';
import { DatePickerDate } from '../common/date-picker-date.class';
import * as moment from 'moment';
import { CalendarOptionsClass } from '../common/bs-calendar-options.provider';

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
  public weeks:number[];
  // days matrix
  public calendar:DatePickerDate[][];
  // locale options
  public locale:any;

  private cOptions:CalendarOptionsClass;

  public constructor(datePickerService:DatePickerState, options:DatePickerOptions, cOptions:CalendarOptionsClass) {
    super(datePickerService, options);
    this.cOptions = cOptions;
    this.refresh(datePickerService.viewDate);
    datePickerService.activeDateChange.subscribe(() => {
      this.markActive();
    });
    datePickerService.selectedDateChange.subscribe(() => {
      this.markSelected();
    });
    datePickerService.selectedEndDateChange.subscribe(() => {
      this.markSelected();
      this.markActive();
    });
  }

  public refresh(_viewDate:any):void {
    if (!this.cOptions) {
      return;
    }

    if (this.options.viewMode !== 'days') {
      return;
    }

    let viewDate = _viewDate;
    if (this.cOptions.isRight()) {
      viewDate = _viewDate.clone().add(this.cOptions.offset, 'months');
    }

    this.calendar = this.getDaysCalendarMatrix(viewDate);
    this.weeks = this.getWeeksNumbers(viewDate);
    this.locale = this.getLocale();
    this.viewMonth = moment(viewDate).format(this.options.format.monthTitle);
    this.viewYear = moment(viewDate).format(this.options.format.yearTitle);
  }

  public markActive():void {
    // mark proper dates as active
    for (let i = 0; i < this.calendar.length; i++) {
      for (let j = 0; j < this.calendar[i].length; j++) {
        if (this.calendar[i][j].isSelected) {
          continue;
        }
        if (this.calendar[i][j].isDisabled) {
          continue;
        }
        this.calendar[i][j].isActive = this.isActive(this.calendar[i][j].date);
        this.calendar[i][j].isHighlighted = this.isHighlighted(this.calendar[i][j].date);
      }
    }
  }

  public markSelected():void {
    // mark proper dates as selected
    for (let i = 0; i < this.calendar.length; i++) {
      for (let j = 0; j < this.calendar[i].length; j++) {
        const isSelected = this.isSelected(this.calendar[i][j].date);
        this.calendar[i][j].isSelected = isSelected;
        this.calendar[i][j].isSelectionStart = this.isSelectionStart(this.calendar[i][j].date);
        this.calendar[i][j].isSelectionEnd = this.isSelectionEnd(this.calendar[i][j].date);
        if (isSelected) {
          this.calendar[i][j].isActive = false;
          this.calendar[i][j].isHighlighted = false;
        }
      }
    }
  }
}
