import { Injectable } from '@angular/core';
const defaults = {};

export type DatePickerViewMode = 'days' | 'months' | 'years';

export interface DatePickerCustomDates {
  /** Any parse-able date format (new Date(), moment(), string, number) */
  date:any;

  /** css classes which will be applied to date,
   * read more about available options in NgClass description
   */
  css?:string | string[] | Object;

  /** should this date be disabled */
  isDisabled?:boolean;
}

export interface DatePickerDateOptions {
  /** minimum available date */
  min:any;
  /** maximum available date */
  max:any;
  /** initially viewed, not selected, date if value is not set */
  initial:any;
  /** initially selected date, if value is not set, in date picker mode */
  selected:any | any[];
  /** initially selected start date in date range picker mode */
  start:any;
  /** initially selected end date in date range picker mode */
  end:any;
}

export class DatePickerFormatOptions {
  /** day format in calendar */
  public day:string = 'D';
  /** month format in calendar */
  public month:string = 'MMM';
  /** year format in calendar */
  public year:string = 'YYYY';
  /** weekdays format in calendar */
  public weekday:string = 'dd';
  // /** format of title when at days calendar */
  // dayTitle:string;
  /** format of month in title */
  public monthTitle:string = 'MMMM';
  /** format of year in title */
  public yearTitle:string = 'YYYY';
  public currentDate: string = 'LLL';
}

export class DatePickerUiOptions {
  /** show localized week numbers at the start of each week on the calendars */
  public showWeekNumbers:boolean = false;
  /** show ISO week numbers at the start of each week on the calendars */
  public showISOWeekNumbers:boolean = false;
  /** show dropdown (if supported) to select month */
  public showMonthDropdown:boolean = false;
  /** show dropdown (if supported) to select year */
  public showYearDropdown:boolean = false;
  /** if `true` label `Custom Ranges` will be shown if `ranges` are defined */
  public showCustomRangeLabel:boolean = true;
  /** if `false` and one of ranges is selected, calendar will be hidden */
  public alwaysShowCalendars:boolean = true;
  /** lower level of view mode */
  public minMode:DatePickerViewMode = 'days';
  /** upper level of view mode */
  public maxMode:DatePickerViewMode = 'years';
  /** number of columns displayed in month selection mode */
  public monthColumns:number = 3;
  /** number of columns displayed in year selection mode */
  public yearRows:number = 4;
  /** number of rows displayed in year selection mode */
  public yearColumns:number = 5;
}

export class DatePickerLocale {
  /** locale name */
  public name:string = 'en';
  public isRtl:boolean = false;
  public close:string = 'Close';
  public apply:string = 'Apply';
  public reset:string = 'Reset';
  public customRange:string = 'Custom Range';
}

export class TimePickerOptions {
  /** increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30) */
  public minutesInc:number = 10;
  /** use 24-hour instead of 12-hour times, removing the AM/PM selection */
  public timePicker24Hour:boolean = false;
}

@Injectable()
export class DatePickerOptions {
  /** current date picker mode */
  public mode:'date' | 'daterange' = 'date';
  /** current date picker view mode (if supported) */
  public viewMode:DatePickerViewMode = 'days';

  public ui:DatePickerUiOptions = new DatePickerUiOptions();
  public date:DatePickerDateOptions;
  public format:DatePickerFormatOptions = new DatePickerFormatOptions();
  public locale:string | DatePickerLocale = 'en';
  public timepicker:boolean | TimePickerOptions = false;

  public customDates:DatePickerCustomDates[];
  /** predefined set of ranges {'today': [moment(), moment()]} */
  public ranges:Object;

  public static setDefaults(options:DatePickerOptions):void {
    Object.assign(defaults, options);
  }
}
