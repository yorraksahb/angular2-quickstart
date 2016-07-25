import { Component } from '@angular/core';
import { DatePickerBase } from './bs-datepicker-base.class';
import { DatePickerService } from './bs-datepicker.service';
import { DatePickerOptions } from './bs-datepicker-options.provider';

@Component({
  selector: 'bs-monthpicker',
  exportAs: 'bs-monthpicker',
  moduleId: module.id,
  templateUrl: './bs-monthpicker.html'
})
export class MonthPickerComponent extends DatePickerBase {
  public months:any[][];
  public title: string;

  public constructor(datePickerService:DatePickerService, options: DatePickerOptions) {
    super(datePickerService, options);
  }

  public refresh(viewDate:any):void {
    if (this.options.viewMode !== 'months') {
      return;
    }
    this.title = viewDate.year();
    this.months = this.getMonthsCalendarMatrix(viewDate);
  }
}
