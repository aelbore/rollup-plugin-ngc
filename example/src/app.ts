import { Component, ViewEncapsulation } from '@angular/core'
import { renderCustomElement } from 'ngx-elements'

@Component({
  selector: 'hello-world',
  templateUrl: './app.html',
  styleUrls: [ './app.css' ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent { }

renderCustomElement(AppComponent)