import {Component} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'my-app',
  directives: [Alert],
  template: `
    <alert type="info">ng2-bootstrap hello world!</alert>
  `,
})
export class AppComponent {
}