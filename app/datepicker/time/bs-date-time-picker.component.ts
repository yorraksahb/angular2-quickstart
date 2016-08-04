import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';

import * as moment from 'moment';
import { OnChange } from '../../utils/decorators';
import { EventEmitter } from '@angular/compiler/src/facade/async';

@Component({
  selector: 'bs-datetimepicker',
  exportAs: 'bs-datetimepicker',
  moduleId: module.id,
  templateUrl: './bs-date-time-picker.html'
})
export class DateTimePickerComponent extends DatePickerBase {
  @OnChange() public date:moment.Moment;
  public dateChange:EventEmitter<moment.Moment> = new EventEmitter();

  public hours:string;
  public minutes:string;
  public ampm:string;
  public showAmPm:boolean = true;

  public constructor(datePickerService:DatePickerState, options:DatePickerOptions) {
    super(datePickerService, options);
    this.dateChange.subscribe((date:moment.Moment)=> {
      if (!this.datePickerState.viewDate.isSame(date)) {
        this.datePickerState.viewDate = date;
        this.refresh();
      }
    });
  }

  public refresh():void {
    if (!this.datePickerState.viewDate || !this.dateChange) {
      return;
    }
    // todo: change to selected/selected end if present
    this.date = this.datePickerState.viewDate;

    let mins = this.date.minutes();
    let roundMins = mins - (mins % this.options.timepicker.minutesInc);
    this.date.minutes(roundMins);
    this.minutes = this.date.format('mm');
    this.hours = this.options.timepicker.showAmPm ?
      this.date.format('hh') : this.date.format('HH');
    this.ampm = this.date.format('a');
    this.showAmPm = this.options.timepicker.showAmPm;
  }

  public add(granularity:string):void {
    if (granularity === 'minutes') {
      this.date = this.date.clone().add(this.options.timepicker.minutesInc, granularity);
      return;
    }
    if (granularity === 'hours') {
      this.date = this.date.clone().add(this.options.timepicker.hoursInc, granularity);
    }
  }

  public subtract(granularity:string):void {
    if (granularity === 'minutes') {
      this.date = this.date.clone().subtract(this.options.timepicker.minutesInc, granularity);
      return;
    }
    if (granularity === 'hours') {
      this.date = this.date.clone().subtract(this.options.timepicker.hoursInc, granularity);
    }
  }
}
