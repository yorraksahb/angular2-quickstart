import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerService } from '../common/bs-date-picker.service';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';
import * as moment from 'moment';

@Component({
  selector: 'bs-current-date',
  exportAs: 'bs-current-date',
  moduleId: module.id,
  templateUrl: './bs-current-date.html'
})
export class CurrentDateComponent extends DatePickerBase {
  public title: string;
  public isShown: boolean = true;

  public constructor(datePickerService:DatePickerService, options:DatePickerOptions) {
    super(datePickerService, options);
    datePickerService.selectedDateChange.subscribe(()=>this.refresh());
    datePickerService.activeDateChange.subscribe(()=>this.refresh());
    options.onUpdate.subscribe(()=>this.refresh());
  }

  public refresh():void {
    if (!this.options.ui.showCurrentDate) {
      this.isShown = false;
      return;
    }
    // todo: add support of timepicker enabled/disabled
    // todo: add support of min view mode
    if (this.datePickerService.activeDate) {
      this.title = moment(this.datePickerService.activeDate)
        .format(this.options.format.currentDate);
      return;
    }

    if (!this.datePickerService.selectedDate) {
      this.title = '';
      return;
    }

    this.title = moment(this.datePickerService.selectedDate)
      .format(this.options.format.currentDate);
  }
}
