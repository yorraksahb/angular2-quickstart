import {Injectable} from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DatePickerService {
  public get selectedDate():any {
    return this._selectedDate;
  }

  public set selectedDate(value:any) {
    const prevValue = this._selectedDate;
    this._selectedDate = value;
    this.selectedDateChanged.emit({value, prevValue});
  }

  public selectedDateChanged:EventEmitter<any> = new EventEmitter<any>();

  public get viewDate():any {
    return this._viewDate;
  }

  public set viewDate(value:any) {
    const prevValue = this._viewDate;
    this._viewDate = value;
    this.viewDateChanged.emit({value, prevValue});
  }

  public viewDateChanged:EventEmitter<any> = new EventEmitter<any>();

  private _viewDate:any = moment();
  private _selectedDate:any = moment();
}
