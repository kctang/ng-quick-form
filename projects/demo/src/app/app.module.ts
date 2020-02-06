import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTooltipModule } from '@angular/material/tooltip'
import { SimpleDemoComponent } from './simple-demo/simple-demo.component'
import { HighlightModule } from 'ngx-highlightjs'
import { SafeHtmlPipe } from './SafeHtmlPipe'
import scss from 'highlight.js/lib/languages/scss'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import { FieldTypesDemoComponent } from './field-types-demo/field-types-demo.component'
import { QuickFormModule } from 'ng-quick-form'
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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
    MatNativeDateModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    MatTooltipModule,
    MatButtonToggleModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    // 'legacy' | 'standard' | 'fill' | 'outline'
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'standard' } }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
