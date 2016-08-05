import { Component, Inject } from '@angular/core';
import { DatePickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { NgModel } from '@angular/forms';
/* tslint:disable */
@Component({
  selector: 'bs-date-picker[ngModel]'
})
export class DatePickerNgModel {

  public constructor(@Inject(DatePickerComponent) dpc, @Inject(NgModel) ngModel) {
    // mode: date <-> selected, moment(date1).isSame(date2)
    // mode: daterange <-> '{{selected}} - {{selected end}}'
  }
}
