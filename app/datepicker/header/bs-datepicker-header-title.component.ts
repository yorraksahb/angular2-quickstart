import { Component } from '@angular/core';

@Component({
  selector: 'bs-datepicker-header-title',
  template: `<button type="button" class="btn btn-default btn-secondary btn-sm" style="width: 100%;">
              <strong>{{title}}</strong>
            </button>`
})
export class BsDatepickerHeaderTitleComponent {
  public title:string = 'hey hye';
}
