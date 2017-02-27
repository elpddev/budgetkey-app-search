import { Component, ViewEncapsulation } from '@angular/core';
import { Colors } from './config';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('styles.css!text') ],
  template: require('./app.component.html!text'),
})
export class AppComponent  { }
