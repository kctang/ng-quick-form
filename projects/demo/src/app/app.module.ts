import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { QuickFormModule } from '../quick-form/QuickForm.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule, MatTabsModule } from '@angular/material'
import { SimpleDemoComponent } from './simple-demo/simple-demo.component'
import { HighlightModule } from 'ngx-highlightjs'
import { SafeHtmlPipe } from './SafeHtmlPipe'
import scss from 'highlight.js/lib/languages/scss'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

export function hljsLanguages () {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml }
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    SimpleDemoComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    QuickFormModule,
    MatButtonModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
