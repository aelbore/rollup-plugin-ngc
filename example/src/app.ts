import { Component, ɵrenderComponent as renderComponent } from '@angular/core'

@Component({
  selector: 'hello-world',
  templateUrl: './app.html'
})
export class AppComponent { }

renderComponent(AppComponent)