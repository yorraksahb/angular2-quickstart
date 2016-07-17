import { DatePickerService } from './bs-datepicker.service';

export class DatePickerBase {
  private datePickerService:DatePickerService;

  public constructor(datePickerService:DatePickerService) {
    this.datePickerService = datePickerService;
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
