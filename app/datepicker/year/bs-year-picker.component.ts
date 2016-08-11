import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';
import * as moment from 'moment';

@Component({
  selector: 'bs-year-picker',
  exportAs: 'bs-year-picker',
  moduleId: module.id,
  templateUrl: './bs-year-picker.html'
})
export class YearPickerComponent extends DatePickerBase {
  public title:string;
  public calendar:any;
  public get yearsStep():number {
    return this.options ? (this.options.ui.yearRows * this.options.ui.yearColumns) : 5;
  }

  public constructor(datePickerService:DatePickerState, options:DatePickerOptions) {
    super(datePickerService, options);
    datePickerService.selectedDateChange.subscribe(() => {
      this.refresh(datePickerService.viewDate);
    });
  }

  public refresh(viewDate:any):void {
    if (this.options.viewMode !== 'years') {
      return;
    }

    const yearsStep = this.options.ui.yearColumns * this.options.ui.yearRows;
    let yearStart = this.getStartingYear(viewDate.year());
    let yearEnd = yearStart + yearsStep;
    this.title = [
      moment().year(yearStart).format(this.options.format.yearTitle),
      moment().year(yearEnd).format(this.options.format.yearTitle)
    ].join(' - ');
    this.calendar = this.getYearsCalendarMatrix(viewDate);
  }
}
