import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule, MatChipsModule,
  MatDialogModule, MatDividerModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material'
import { QuickFormFieldComponent } from './mat/QuickFormField.component'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    QuickFormFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  exports: [
    QuickFormFieldComponent
  ]
})
export class QuickFormModule {
}
