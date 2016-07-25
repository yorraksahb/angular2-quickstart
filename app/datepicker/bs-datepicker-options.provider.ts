const defaults = {};

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

export interface DatePickerFormatOptions {
  /** day format in calendar */
  day:string;
  /** month format in calendar */
  month:string;
  /** year format in calendar */
  year:string;
  /** weekdays format in calendar */
  weekday:string;
  /** format of title when at days calendar */
  dayTitle:string;
  /** format of title when at months calendar */
  monthTitle:string;
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
  public showCustomRangeLabel: boolean = true;
  /** if `false` and one of ranges is selected, calendar will be hidden */
  public alwaysShowCalendars: boolean = true;
  /** lower level of mode */
  public minMode:string = 'day';
  /** upper level of mode */
  public maxMode:string = 'year';
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
  public isRtl: boolean = false;
  public close: string = 'Close';
  public apply: string = 'Apply';
  public reset: string = 'Reset';
  public customRange: string = 'Custom Range';
}

export class TimePickerOptions {
  /** increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30) */
  public minutesInc:number = 10;
  /** use 24-hour instead of 12-hour times, removing the AM/PM selection */
  public timePicker24Hour:boolean = false;
}

export class DatePickerOptions {
  public mode: 'date' | 'daterange' = 'date';
  public ui:DatePickerUiOptions;
  public date:DatePickerDateOptions;
  public format:DatePickerFormatOptions;
  public locale:string | DatePickerLocale = 'en';
  public timepicker:boolean | TimePickerOptions = false;

  public customDates:DatePickerCustomDates[];
  /** predefined set of ranges {'today': [moment(), moment()]} */
  public ranges:Object;

  public static setDefaults(options:DatePickerOptions):void {
    Object.assign(defaults, options);
  }
}
