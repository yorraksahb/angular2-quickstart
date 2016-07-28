import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerService } from '../common/bs-date-picker.service';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';

@Component({
  selector: 'bs-monthpicker',
  exportAs: 'bs-monthpicker',
  moduleId: module.id,
  templateUrl: './bs-month-picker.html'
})
export class MonthPickerComponent extends DatePickerBase {
  public months:any[][];
  public title: string;

  public constructor(datePickerService:DatePickerService, options: DatePickerOptions) {
    super(datePickerService, options);
    datePickerService.selectedDateChange.subscribe(() => {
      this.refresh(datePickerService.selectedDate);
    });
  }

  public refresh(viewDate:any):void {
    if (this.options.viewMode !== 'months') {
      return;
    }
    this.title = viewDate.year();
    this.months = this.getMonthsCalendarMatrix(viewDate);
  }
}
