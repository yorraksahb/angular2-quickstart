import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';

import * as moment from 'moment';

@Component({
  selector: 'bs-custom-range-picker',
  exportAs: 'bs-custom-range-picker',
  moduleId: module.id,
  templateUrl: './bs-custom-range-picker.html'
})
export class CustomRangePickerComponent extends DatePickerBase {

  public constructor(datePickerService:DatePickerState, options:DatePickerOptions) {
    super(datePickerService, options);
  }

  public active(start:any, end:any):void {
    const startDate = moment().subtract(start, 'days');
    const endDate = moment().subtract(end, 'days');

    this.selectDate(startDate);
    this.selectDate(endDate);
  }

  public refresh():void {}
}
