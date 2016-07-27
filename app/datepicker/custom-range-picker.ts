import { Component } from '@angular/core';
import { DatePickerBase } from './bs-date-picker-base.class';
import { DatePickerService } from './bs-date-picker.service';
import { DatePickerOptions } from './bs-date-picker-options.provider';

@Component({
  selector: 'bs-custom-range-picker',
  exportAs: 'bs-custom-range-picker',
  moduleId: module.id,
  templateUrl: './bs-custom-range-picker.html'
})
export class CustomRangePickerComponent extends DatePickerBase {

  public constructor(datePickerService:DatePickerService, options:DatePickerOptions) {
    super(datePickerService, options);
  }

  public refresh():void {}
}
