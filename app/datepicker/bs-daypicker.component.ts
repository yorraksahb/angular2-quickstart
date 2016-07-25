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

    this.refresh(datePickerService.viewDate);
    datePickerService.viewDateChange.subscribe((event:any) => {
      this.refresh(event);
    });
    datePickerService.selectedDateChange.subscribe((event:any) => {
      this.refresh(event);
    });
  }

  public refresh(currentDay:any):void {
    const localeData = moment.localeData();
    this.locale = {
      direction: 'ltr',
      format: localeData.longDateFormat('L'),
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      weekdays: moment.weekdays(true),
      weekdaysShort: moment.weekdaysMin(true),
      monthNames: moment.monthsShort(),
      firstDay: (localeData as any).firstDayOfWeek()
    };

    const calendarMatrix = this.datePickerService.getCalendarMatrix(currentDay, this);
    this.weeks = calendarMatrix.weeks;
    this.calendar = calendarMatrix.calendar;
    this.title = currentDay.format('MMM YYYY');
  }
}
