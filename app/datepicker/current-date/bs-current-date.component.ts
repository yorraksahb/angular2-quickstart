import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';
import * as moment from 'moment';
import { CalendarOptionsClass } from '../common/bs-calendar-options.provider';

@Component({
  selector: 'bs-current-date',
  exportAs: 'bs-current-date',
  moduleId: module.id,
  templateUrl: './bs-current-date.html'
})
export class CurrentDateComponent extends DatePickerBase {
  public title:string;
  public isShown:boolean = true;
  private cOptions:CalendarOptionsClass;

  public constructor(datePickerService:DatePickerState, options:DatePickerOptions, cOptions:CalendarOptionsClass) {
    super(datePickerService, options);
    this.cOptions = cOptions;
    datePickerService.selectedDateChange.subscribe(()=>this.refresh());
    datePickerService.activeDateChange.subscribe(()=>this.refresh());
    options.onUpdate.subscribe(()=>this.refresh());
  }

  public refresh():void {
    if (!this.cOptions) {
      return;
    }

    if (!this.options.ui.showCurrentDate) {
      this.isShown = false;
      return;
    }
    // todo: add support of timepicker enabled/disabled
    // todo: add support of min view mode
    const active = this.datePickerService.activeDate;
    const selected = this.datePickerService.selectedDate;
    const selectedEnd = this.datePickerService.selectedEndDate;

    if (this.options.isDatePicker) {
      this.title = this.getTitle(active || selected);
      return;
    }

    if (this.options.isDateRangePicker) {
      if (this.cOptions.isLeft) {
        // if selection end date not selected - show selection start or active date
        // if selection end date selected - show selection start date
        this.title = this.getTitle(!selectedEnd ? (selected || active) : active);
      }

      if (this.cOptions.isRight) {
        this.title = selected ? this.getTitle(selectedEnd || active) : '';
      }
    }
  }

  public getTitle(date:moment.Moment):string {
    return moment(date).format(this.options.format.currentDate);
  }
}
