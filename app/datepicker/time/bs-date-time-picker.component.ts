import { Component } from '@angular/core';
import { DatePickerBase } from './bs-date-picker-base.class';
import { DatePickerService } from './bs-date-picker.service';
import { DatePickerOptions } from './bs-date-picker-options.provider';

@Component({
  selector: 'bs-datetimepicker',
  exportAs: 'bs-datetimepicker',
  moduleId: module.id,
  templateUrl: './bs-date-time-picker.html'
})
export class DateTimePickerComponent extends DatePickerBase {

  public constructor(datePickerService:DatePickerService, options:DatePickerOptions) {
    super(datePickerService, options);
  }

  public refresh():void {}
}
