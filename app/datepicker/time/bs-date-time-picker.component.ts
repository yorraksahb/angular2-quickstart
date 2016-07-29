import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';

@Component({
  selector: 'bs-datetimepicker',
  exportAs: 'bs-datetimepicker',
  moduleId: module.id,
  templateUrl: './bs-date-time-picker.html'
})
export class DateTimePickerComponent extends DatePickerBase {

  public constructor(datePickerService:DatePickerState, options:DatePickerOptions) {
    super(datePickerService, options);
  }

  public refresh():void {}
}
