import { Component } from '@angular/core';
import { DatePickerBase } from './bs-date-picker-base.class';
import { DatePickerService } from './bs-date-picker.service';
import { DatePickerOptions } from './bs-date-picker-options.provider';

@Component({
  selector: 'bs-current-date',
  exportAs: 'bs-current-date',
  moduleId: module.id,
  templateUrl: './bs-current-date.html'
})
export class CurrentDateComponent extends DatePickerBase {

  public constructor(datePickerService:DatePickerService, options:DatePickerOptions) {
    super(datePickerService, options);
  }

  public refresh():void {}
}
