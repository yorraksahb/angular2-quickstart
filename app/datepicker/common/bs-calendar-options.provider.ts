import { Injectable, EventEmitter } from '@angular/core';

const left = 'left';
const right = 'right';

export interface CalendarOptions {
  // should be `left` or `right`
  bsRole: string;
  offset?: number;
}

@Injectable()
export class CalendarOptionsClass implements CalendarOptions {
  public bsRole: string;

  public get offset():number {
    return this.isLeft() ? 0 : this._offset;
  }
  public set offset(value:number) {
    this._offset = value;
  }

  public onUpdate:EventEmitter<CalendarOptionsClass> = new EventEmitter();

  private _offset:number = 1;
  public update(value: CalendarOptions):void {
    Object.assign(this, value);
    this.onUpdate.emit(this);
  }

  public isLeft():boolean {
    return this.bsRole === left;
  }

  public isRight(): boolean {
    return this.bsRole === right;
  }
}
