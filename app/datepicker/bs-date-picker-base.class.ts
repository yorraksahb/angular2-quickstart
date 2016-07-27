import { DatePickerService } from './bs-date-picker.service';
import { DatePickerViewMode, DatePickerOptions } from './bs-date-picker-options.provider';
import * as moment from 'moment';

import { OnInit } from '@angular/core';

export abstract class DatePickerBase implements OnInit {
  protected datePickerService:DatePickerService;
  protected options:DatePickerOptions;

  // protected calendar: DatePickerDate[][];

  public constructor(datePickerService:DatePickerService, options:DatePickerOptions) {
    this.datePickerService = datePickerService;
    this.options = options;

    this.refresh(datePickerService.viewDate);
    datePickerService.viewDateChange.subscribe(() => {
      this.refresh(datePickerService.viewDate);
    });
    // datePickerService.activeDateChange.debounceTime(150).subscribe(() => {
    //   this.markActive(datePickerService.viewDate);
    // });
    // datePickerService.selectedDateChange.subscribe(() => {
    //   this.markSelected(datePickerService.selectedDate);
    // });
  }

  public ngOnInit():void {
    if (this.options.date && this.options.date.initial) {
      this.datePickerService.viewDate = this.options.date.initial;
    }

    if (this.options.date && this.options.date.selected) {
      this.datePickerService.selectedDate = this.options.date.selected;
    }
  }

  public abstract refresh(viewDate:any):void;

  public viewMode(mode:DatePickerViewMode):void {
    this.options.viewMode = mode;
  }

  public viewDate(date:any, _opts:{degrade:boolean}):void {
    const opts = Object.assign({}, {degrade: false}, _opts);
    this.datePickerService.viewDate = date;

    if (this.options.viewMode && opts.degrade) {
      if (this.options.viewMode === 'years') {
        this.options.viewMode = 'months';
      } else if (this.options.viewMode === 'months') {
        this.options.viewMode = 'days';
      }
    }
  }

  public activeDate(date:any):void {
    this.datePickerService.activeDate = date;
  }

  public selectDate(date:any):void {
    this.datePickerService.selectedDate = date;
  }

  public prev(unitOfTime:'days'|'months'|'years', step:number = 1):void {
    this.datePickerService.viewDate = this.datePickerService.viewDate.clone().subtract(step, unitOfTime);
  }

  public next(unitOfTime:'days'|'months'|'years', step:number = 1):void {
    this.datePickerService.viewDate = this.datePickerService.viewDate.clone().add(step, unitOfTime);
  }

  public getDaysCalendarMatrix(viewDate:any, options:any):any {
    const localeData = moment.localeData();
    const locale = {
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
    //
    // Build the matrix of dates that will populate the calendar
    //
    const calendar1 = {
      month: viewDate,
      firstDay: void 0,
      lastDay: void 0
    };
    // current date
    const month = viewDate.month();
    const year = viewDate.year();
    // const date = viewDate.date();
    const hour = viewDate.hour();
    const minute = viewDate.minute();
    const second = viewDate.second();
    // month range
    const daysInMonth = moment([year, month]).daysInMonth();
    const firstDay = moment([year, month, 1]);
    const lastDay = moment([year, month, daysInMonth]);
    // prev
    const lastMonth = moment(firstDay).subtract(1, 'month').month();
    const lastYear = moment(firstDay).subtract(1, 'month').year();
    const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
    const dayOfWeek = firstDay.day();

    // initialize a 6 rows x 7 columns array for the calendar
    const calendarW = 6;
    const calendarH = 7;
    const calendar = new Array(calendarW);
    calendar1.firstDay = firstDay;
    calendar1.lastDay = lastDay;

    // initialize weeks row
    const weeks = new Array(calendarH);
    for (let j = 0; j < calendarW; j++) {
      calendar[j] = new Array(calendarH);
    }

    // populate the calendar with date objects
    let startDay = daysInLastMonth - dayOfWeek + locale.firstDay + 1;
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }

    if (dayOfWeek === locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }

    let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
    // where the f*** 42 came from
    for (let [i, col,row] = [0, 0,
      0]; i < calendarH * calendarW; i++, col++, curDate = moment(curDate)
      .add(24, 'hour')) {
      if (i > 0 && col % 7 === 0) {
        col = 0;
        row++;
      }
      if (col === 0) {
        weeks[row] = curDate.week();
      }

      calendar[row][col] = {
        date: curDate.clone().hour(hour).minute(minute).second(second),
        label: curDate.date(),
        isActive: this.isActive(curDate),
        isSelected: this.isSelected(curDate),
        isDisabled: this.isDisabled(curDate)
      };
      curDate.hour(12);

      // todo: take in account min and max dates
      // if (this.minDate && calendar[row][col].format('YYYY-MM-DD') ==
      // this.minDate.format('YYYY-MM-DD') &&
      // calendar[row][col].isBefore(this.minDate) && side == 'left') {
      // calendar[row][col] = this.minDate.clone(); }  if (this.maxDate &&
      // calendar[row][col].format('YYYY-MM-DD') ==
      // this.maxDate.format('YYYY-MM-DD') &&
      // calendar[row][col].isAfter(this.maxDate) && side == 'right') {
      // calendar[row][col] = this.maxDate.clone(); }
    }

    return {weeks, calendar, locale};
  }

  public isSelected(currDate:any):boolean {
    const selectedDate = this.datePickerService.selectedDate;
    if (!selectedDate || !currDate) {
      return false;
    }

    if (currDate.year() !== selectedDate.year() || currDate.month() !== selectedDate.month()) {
      return false;
    }

    return currDate.date() === selectedDate.date();
  }

  public isActive(currDate:any):boolean {
    const selectedDate = this.datePickerService.selectedDate;
    const activeDate = this.datePickerService.activeDate;

    if (!selectedDate || !activeDate || !currDate) {
      return false;
    }

    return moment(currDate).isAfter(selectedDate) &&
      moment(currDate).isBefore(activeDate);
  }

  public isDisabled(date:any):boolean {
    const minDate = this.options.date && this.options.date.min;
    const maxDate = this.options.date && this.options.date.max;
    // min, max, weekdays
    if (minDate && moment(date).isSameOrBefore(minDate)) {
      return true;
    }

    if (maxDate && moment(date).isSameOrAfter(maxDate)) {
      return true;
    }

    // todo: check dates options
    return false;
  }

  public getMonthsCalendarMatrix(viewDate:any/*, options:any*/):any {
    const w = 3;
    const h = 4;
    let months = new Array(h);
    for (let row = 0; row < h; row++) {
      months[row] = new Array(w);
      for (let coll = 0; coll < w; coll++) {
        let monthNum = row * w + coll;
        months[row][coll] = {
          date: moment([viewDate.year(), monthNum, 1]),
          label: moment.months()[monthNum],
          isActive: monthNum === viewDate.month()
        };
      }
    }
    return months;
  }

  public getYearsCalendarMatrix(viewDate:any/*, options:any*/):any {
    let year = this.getStartingYear(viewDate.year());
    const cols = this.options.ui.yearColumns;
    const rows = this.options.ui.yearRows;
    let yearsMatrix = new Array(rows);
    for (let row = 0; row < rows; row++) {
      yearsMatrix[row] = new Array(cols);
      for (let coll = 0; coll < cols; coll++, year++) {
        yearsMatrix[row][coll] = {
          date: moment([year, viewDate.month()]),
          label: year
        };
      }
    }
    return yearsMatrix;
  }

  public getStartingYear(year:number):number {
    const yearsStep = this.options.ui.yearColumns * this.options.ui.yearRows;
    // return ((year - 1) / this.yearsStep) * this.yearsStep + 1;
    return year - year % yearsStep;
  }
}
