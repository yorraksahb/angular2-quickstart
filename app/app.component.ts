import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DatePickerComponent } from './datepicker/bs-date-picker.component';
import { NgModel } from '@angular/forms';
moment.locale('ru');

@Component({
  selector: 'my-app',
  directives: [DatePickerComponent, NgModel],
  template: `
<input type="text" [(ngModel)]="opts.mode">
<input type="text" [(ngModel)]="opts.viewMode">
<button class="btn btn-success btn-sm" (click)="refresh()">refresh</button>
<!--<pre>{{opts | json}}</pre>-->
<div class="row">
    <bs-datepicker [options]="opts"></bs-datepicker>
    <!--<bs-datepicker-inline [options]="opts"></bs-datepicker-inline>-->
</div>

`

})
export class AppComponent implements OnInit {
  public opts:any = {
    mode: 'daterange',
    viewMode: 'days',
    ui: {
      minMode: 'days',
      maxMode: 'years',
      showWeekNumbers: 1,
      showISOWeekNumbers: 0,
      showCurrentDate: 1,
      alwaysShowCalendars: 1
    },
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    customDates: [{
      date: moment().subtract(15, 'days'),
      isDisabled: false
    }],
    date: {
      // min : moment().subtract(5, 'days')
    }
  };

  public refresh():void {
    this.opts = Object.assign({}, this.opts);
  }

  public ngOnInit():void {
  }
}
