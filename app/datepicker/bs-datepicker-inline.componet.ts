import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DatePickerComponent } from './bs-datepicker.component';
// moment.weekdays(true) - returns ordered weekdays

// todos:
// 1. week days names
// 2. moths days

@Component({
  selector: 'bs-datepicker-inline',
  templateUrl: './bs-datepicker-inline.html',
  directives: [NgIf, NgFor, DatePickerComponent],
  moduleId: module.id
})
export class DatePickerInlineComponent {
  public isHidden:boolean = false;

  public toggle():void {
    this.isHidden = !this.isHidden;
  }
}
