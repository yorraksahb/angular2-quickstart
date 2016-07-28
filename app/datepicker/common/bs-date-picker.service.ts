import { Injectable, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { OnChange } from '../../utils/decorators';

@Injectable()
export class DatePickerService {
  @OnChange() public selectedDate:any;
  public selectedDateChange:EventEmitter<any> = new EventEmitter<any>();

  @OnChange() public selectedEndDate:any;
  public selectedEndDateChange:EventEmitter<any> = new EventEmitter<any>();

  @OnChange() public activeDate: any;
  public activeDateChange:EventEmitter<any> = new EventEmitter<any>();

  @OnChange(moment()) public viewDate:any;
  public viewDateChange:EventEmitter<any> = new EventEmitter<any>();
}
