import { Component, OnInit, enableProdMode } from '@angular/core';
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
<pre>{{opts | json}}</pre>
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
      maxMode: 'months',
      showWeekNumbers: 1,
      showISOWeekNumbers: 0,
      showCurrentDate: 1
    },
    customDates: [{
      date: moment().subtract(15, 'days'),
      isDisabled: true
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
