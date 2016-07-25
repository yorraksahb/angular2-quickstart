import { DatePickerService } from './bs-datepicker.service';
import { DatePickerViewMode, DatePickerOptions } from './bs-datepicker-options.provider';

export class DatePickerBase {
  protected datePickerService:DatePickerService;
  protected options: DatePickerOptions;

  public constructor(datePickerService:DatePickerService, options: DatePickerOptions) {
    this.datePickerService = datePickerService;
    this.options = options;
  }

  public viewMode(mode: DatePickerViewMode) {
    this.options.viewMode = mode;
  }

  public viewDate(date:any):void {
    this.datePickerService.viewDate = date;
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
}
