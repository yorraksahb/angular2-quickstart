import { Component, Input, OnInit } from '@angular/core';
import { DatePickerOptions } from './common/bs-date-picker-options.provider';
import { CalendarOptionsClass } from './common/bs-calendar-options.provider';
import { DatePickerState } from './common/bs-date-picker-state.provider';

// todo: rename to calendar
@Component({
  selector: 'bs-date-picker-view',
  exportAs: 'bs-date-picker-view',
  templateUrl: './bs-date-picker-view.html',
  moduleId: module.id
})
export class DatePickerViewComponent implements OnInit {
  public isShown:boolean = true;
  public options:DatePickerOptions;
  public cOptions:CalendarOptionsClass;
  @Input() public bsRole:string;

  public constructor(datePickerState:DatePickerState, datePickerOptions:DatePickerOptions, cOptions:CalendarOptionsClass) {
    this.options = datePickerOptions;
    this.cOptions = cOptions;
    datePickerState.showCalendarsChange.subscribe((v:boolean) => this.isShown = v);
  }

  public ngOnInit():void {
    this.cOptions.update({
      bsRole: this.bsRole
    });
  }
}
