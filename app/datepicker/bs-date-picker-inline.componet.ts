import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DatePickerComponent } from './bs-date-picker.component';
import { CustomRangePickerComponent } from './custom-range-picker';
import { DatePickerOptions } from './bs-date-picker-options.provider';
import { DatePickerService } from './bs-date-picker.service';
// moment.weekdays(true) - returns ordered weekdays

// todos:
// 1. week days names
// 2. moths days

@Component({
  selector: 'bs-datepicker-inline',
  templateUrl: './bs-date-picker-inline.html',
  directives: [NgIf, NgFor, DatePickerComponent, CustomRangePickerComponent],
  providers: [DatePickerService, DatePickerOptions],
  moduleId: module.id
})
export class DatePickerInlineComponent {
  public isHidden:boolean = false;

  public toggle():void {
    this.isHidden = !this.isHidden;
  }
}
