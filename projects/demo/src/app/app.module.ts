import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material'
import { SimpleDemoComponent } from './simple-demo/simple-demo.component'
import { HighlightModule } from 'ngx-highlightjs'
import { SafeHtmlPipe } from './SafeHtmlPipe'
import scss from 'highlight.js/lib/languages/scss'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import { FieldTypesDemoComponent } from './field-types-demo/field-types-demo.component'
import { QuickFormModule } from 'ng-quick-form'

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
    SafeHtmlPipe,
    FieldTypesDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QuickFormModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    MatTooltipModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
