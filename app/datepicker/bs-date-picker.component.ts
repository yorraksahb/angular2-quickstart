import { Component, Inject, Input, EventEmitter } from '@angular/core';
import { DatePickerOptions } from './common/bs-date-picker-options.provider';
import { CustomRangePickerComponent } from './custom-range/bs-custom-range-picker.component';
import { DatePickerService } from './common/bs-date-picker.service';
import { DatePickerViewComponent } from './bs-date-picker-view.component';
import { OnChange } from '../utils/decorators';

@Component({
  selector: 'bs-datepicker',
  exportAs: 'bs-datepicker',
  templateUrl: './bs-date-picker.html',
  directives: [DatePickerViewComponent, CustomRangePickerComponent],
  providers: [DatePickerService, DatePickerOptions],
  moduleId: module.id
})
export class DatePickerComponent {
// here will be parsed options and set defaults
  @Input() @OnChange() public options:DatePickerOptions;
  public optionsChange:EventEmitter<DatePickerOptions> = new EventEmitter();

  public constructor(@Inject(DatePickerOptions) datePickerOptions:DatePickerOptions) {
    this.optionsChange.subscribe((v:any)=> {
      datePickerOptions.update(v);
    });
  }
}
