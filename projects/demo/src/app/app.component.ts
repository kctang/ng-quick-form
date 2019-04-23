import { ChangeDetectionStrategy, Component } from '@angular/core'
import { code } from './code'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  code = code
}
