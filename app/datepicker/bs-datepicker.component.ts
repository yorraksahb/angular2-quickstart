import { Component, Inject } from '@angular/core';
import { DayPickerComponent } from './bs-daypicker.component';
import { MonthPickerComponent } from './bs-monthpicker.component';
import { YearPickerComponent } from './bs-yearpicker.component';
import { DatePickerService } from './bs-datepicker.service';

@Component({
  selector: 'bs-datepicker',
  exportAs: 'bs-datepicker',
  templateUrl: './bs-datepicker.html',
  directives: [DayPickerComponent, MonthPickerComponent, YearPickerComponent],
  providers: [DatePickerService],
  moduleId: module.id
})
export class DatePickerComponent {
// here will be parsed options and set defaults
  public constructor(){

  }
}
