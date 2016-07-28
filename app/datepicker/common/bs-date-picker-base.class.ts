import { DatePickerService } from './bs-date-picker.service';
import { DatePickerViewMode, DatePickerOptions, DatePickerViewModes } from './bs-date-picker-options.provider';
import * as moment from 'moment';

import { OnInit } from '@angular/core';

export type Granularity = 'day' | 'month' | 'year';

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
    options.onUpdate.subscribe(() => {
      this.refresh(datePickerService.viewDate);
    });
  }

  public ngOnInit():void {
    if (this.options.date && this.options.date.initial) {
      this.datePickerService.viewDate = this.options.date.initial;
    }

    if (this.options.date && this.options.date.selected) {
      this.datePickerService.selectedDate = this.options.date.selected;
    }
  }

  public abstract refresh(date:any):void;

  /**
   * Selects new view mode
   * do nothing if mode <> min/max modes
   */
  public viewMode(mode:DatePickerViewMode):void {
    if (DatePickerViewModes[mode] >= DatePickerViewModes[this.options.ui.minMode] &&
      DatePickerViewModes[mode] <= DatePickerViewModes[this.options.ui.maxMode]) {
      this.options.viewMode = mode;
    }
  }

  public viewDate(date:any, _opts:{degrade:boolean}):void {
    const opts = Object.assign({}, {degrade: false}, _opts);
    this.datePickerService.viewDate = date;

    // fixme: triple if, oh really?
    if (this.options.viewMode && opts.degrade) {
      if (this.options.viewMode === 'years') {
        if (DatePickerViewModes.months >= DatePickerViewModes[this.options.ui.minMode]) {
          this.options.viewMode = 'months';
        } else {
          this.selectDate(date);
        }
      } else if (this.options.viewMode === 'months') {
        if (DatePickerViewModes.days >= DatePickerViewModes[this.options.ui.minMode]) {
          this.options.viewMode = 'days';
        } else {
          this.selectDate(date);
        }
      }
    }
  }

  public activeDate(date:any):void {
    if (this.isDisabled(date)) {
      return;
    }

    // todo: add range check

    this.datePickerService.activeDate = date;
  }

  public selectDate(date:any):void {
    if (this.isDisabled(date)) {
      return;
    }

    if (this.options.isDatePicker) {
      // select date
      this.datePickerService.selectedDate = date;
      this.datePickerService.selectedEndDate = void 0;
      return;
    }

    if (this.options.isDateRangePicker) {
      // if no selected then set start date
      if (!this.datePickerService.selectedDate) {
        this.datePickerService.selectedDate = date;
        return;
      }

      // if end date lesser then the start date
      if (moment(date).isBefore(this.datePickerService.selectedDate, 'day')) {
        this.datePickerService.selectedDate = date;
        this.datePickerService.selectedEndDate = void 0;
        return;
      }

      // allow to select one date at range picker
      if (moment(date).isSame(this.datePickerService.selectedDate, 'day')) {
        this.datePickerService.selectedEndDate = date;
        return;
      }

      // select new range start
      if (this.datePickerService.selectedEndDate) {
        this.datePickerService.selectedDate = date;
        this.datePickerService.selectedEndDate = void 0;
        return;
      }

      // don't allow to select range with disabled dates in the middle
      if (this.isDisabledDateInRange(date)) {
        return;
      }

      // if start date is selected than select end date
      if (this.isSame(this.datePickerService.selectedDate, date)) {
        this.datePickerService.selectedDate = date;
        this.datePickerService.selectedEndDate = void 0;
        return;
      }

      this.datePickerService.selectedEndDate = date;
    }
  }

  public prev(unitOfTime:'days'|'months'|'years', step:number = 1):void {
    this.datePickerService.viewDate = this.datePickerService.viewDate.clone().subtract(step, unitOfTime);
  }

  public next(unitOfTime:'days'|'months'|'years', step:number = 1):void {
    this.datePickerService.viewDate = this.datePickerService.viewDate.clone().add(step, unitOfTime);
  }

  public isSelected(date:any):boolean {
    if (!date) {
      return false;
    }

    if (this.options.isDatePicker) {
      return this.isSame(this.datePickerService.selectedDate, date);
    }

    return this.isSame(this.datePickerService.selectedDate, date) ||
      this.isSame(this.datePickerService.selectedEndDate, date);
  }

  public isActive(currDate:any):boolean {
    if (this.options.isDatePicker) {
      return false;
    }

    const selectedDate = this.datePickerService.selectedDate;
    const selectedEndDate = this.datePickerService.selectedEndDate;
    const activeDate = this.datePickerService.activeDate;

    if (!selectedDate || !currDate) {
      return false;
    }

    if (selectedDate && !activeDate && !selectedEndDate) {
      return false;
    }

    if (selectedEndDate) {
      if (this.isDisabledDateInRange(selectedEndDate)) {
        return false;
      }
      return moment(currDate).isAfter(selectedDate, 'day') &&
        moment(currDate).isBefore(selectedEndDate, 'day');
    }

    if (this.isDisabledDateInRange(activeDate)) {
      return false;
    }
    return moment(currDate).isAfter(selectedDate, 'day') &&
      moment(currDate).isBefore(activeDate, 'day');
  }

  public isDisabled(date:any, granularity:Granularity = 'day'):boolean {
    if (!date) {
      return true;
    }

    const minDate = this.options.date && this.options.date.min;
    const maxDate = this.options.date && this.options.date.max;

    if (minDate && moment(date).isSameOrBefore(minDate, granularity)) {
      return true;
    }

    if (maxDate && moment(date).isSameOrAfter(maxDate, granularity)) {
      return true;
    }

    const customDates = this.options.customDates;
    if (customDates) {
      for (let i = 0; i < customDates.length; i++) {
        if (customDates[i].isDisabled && this.isSame(customDates[i].date, date)) {
          return true;
        }
      }
    }

    // todo: check dates options
    return false;
  }

  public isSelectionStart(date:any):boolean {
    if (!this.options.isDateRangePicker) {
      return false;
    }
    return this.isSame(date, this.datePickerService.selectedDate);
  }

  public isSelectionEnd(date:any):boolean {
    if (!this.options.isDateRangePicker) {
      return false;
    }
    return this.isSame(date, this.datePickerService.selectedEndDate);
  }

  public isOtherMonth(date:any):boolean {
    return !moment(date).isSame(this.datePickerService.viewDate, 'month');
  }

  public isHighlighted(date:any):boolean {
    if (this.isDisabledDateInRange(date)) {
      return false;
    }

    return moment(date).isSame(this.datePickerService.activeDate, 'day');
  }

  public isDisabledDateInRange(date: any):boolean {
    if (!this.options.isDateRangePicker) {
      return false;
    }

    const customDates = this.options.customDates;
    if (customDates) {
      for (let i = 0; i < customDates.length; i++) {
        if (customDates[i].isDisabled &&
          moment(customDates[i].date).isSameOrAfter(this.datePickerService.selectedDate, 'day') &&
          moment(customDates[i].date).isSameOrBefore(date, 'day')) {
          return true;
        }
      }
    }

    return false;
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
        isDisabled: this.isDisabled(curDate),
        isSelectionStart: this.isSelectionStart(curDate),
        isSelectionEnd: this.isSelectionEnd(curDate),
        isOtherMonth: this.isOtherMonth(curDate),
        isHighlighted: this.isHighlighted(curDate)
      };
      curDate.hour(12);
    }

    return {weeks, calendar, locale};
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

  public isSame(date1:any, date2:any):boolean {
    if (!date1 || !date2) {
      return false;
    }

    return moment(date1).isSame(date2, 'day');
  }
}
