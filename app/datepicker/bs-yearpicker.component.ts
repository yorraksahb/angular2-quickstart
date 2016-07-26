import { Component } from '@angular/core';
import { DatePickerBase } from './bs-datepicker-base.class';
import { DatePickerService } from './bs-datepicker.service';
import { DatePickerOptions } from './bs-datepicker-options.provider';

@Component({
  selector: 'bs-yearpicker',
  exportAs: 'bs-yearpicker',
  moduleId: module.id,
  templateUrl: './bs-yearpicker.html'
})
export class YearPickerComponent extends DatePickerBase {
  public title:string;
  public yearsMatrix:any;

  public constructor(datePickerService:DatePickerService, options: DatePickerOptions) {
    super(datePickerService, options);
    datePickerService.selectedDateChange.subscribe(() => {
      this.refresh(datePickerService.selectedDate);
    });
  }

  public refresh(viewDate:any):void {
    if (this.options.viewMode !== 'years') {
      return;
    }
    const yearsStep = this.options.ui.yearColumns * this.options.ui.yearRows;
    let year = this.getStartingYear(viewDate.year());
    this.title = [year, year + yearsStep].join(' - ');
    this.yearsMatrix = this.getYearsCalendarMatrix(viewDate);
  }
}
