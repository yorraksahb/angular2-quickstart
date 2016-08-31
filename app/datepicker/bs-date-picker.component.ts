import { Component, Input, EventEmitter } from '@angular/core';
import { DatePickerOptions } from './common/bs-date-picker-options.provider';
import { OnChange } from '../utils/decorators';

@Component({
  selector: 'bs-datepicker',
  exportAs: 'bs-datepicker',
  templateUrl: './bs-date-picker.html',
  moduleId: module.id
})
export class DatePickerComponent {
// here will be parsed options and set defaults
  @Input() @OnChange() public options:DatePickerOptions;
  public optionsChange:EventEmitter<DatePickerOptions> = new EventEmitter();

  public constructor(private datePickerOptions:DatePickerOptions) {
    this.optionsChange.subscribe((v:any)=> {
      datePickerOptions.update(v);
    });
  }

  public apply(){

  }
}
