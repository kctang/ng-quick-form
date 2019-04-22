import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms'
import { QuickFormField } from '../QuickFormField'
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material'
import { of, Observable } from 'rxjs'
import { map, startWith, tap } from 'rxjs/operators'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { BaseComponent } from '../util/BaseComponent'
import { getErrorMessage } from '../util/getErrorMessage'
import { assert } from '../util/assert'

@Component({
  selector: 'quick-form-field',
  templateUrl: './QuickFormField.component.html',
  styleUrls: [ './QuickFormField.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickFormFieldComponent extends BaseComponent implements OnInit {
  @Input()
  form!: FormGroup

  @Input()
  field!: QuickFormField

  separatorKeysCodes: number[] = [ ENTER, COMMA ]

  @ViewChild('chipInput')
  chipInput!: ElementRef<HTMLInputElement>
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete
  chipControl = new FormControl()
  chipValues: string[] = []
  chipWithGroups = false
  filteredChipValuesWithGroup!: Observable<{ group: string, options: { value: any, label: string }[] }[]>
  filteredChipValues!: Observable<{ value: any, label: string }[]>

  ngOnInit (): void {
    if (this.field.type === 'chips') {
      this.chipValues = this.form.controls[ this.fieldId ].value
      this.chipWithGroups = this.isChipWithGroups()

      if (this.chipWithGroups) {
        this.filteredChipValuesWithGroup = this.chipControl.valueChanges.pipe(
          startWith(null),
          map((value: string | null) => {
            return value ? this._filterWithGroups(value) : [ ...this.allChipValuesWithGroup ]
          })
        )
      } else {
        this.filteredChipValues = this.chipControl.valueChanges.pipe(
          startWith(null),
          map((value: string | null) => {
            return value ? this._filter(value) : [ ...this.allChipValues ]
          })
        )
      }
    }
  }

  errorMessage (control: AbstractControl) {
    return getErrorMessage(control)
  }

  getChildControls (fieldId: string) {
    const control = this.form.get(fieldId) as FormArray
    return control.controls
  }

  get fieldId () {
    return this.field.id!
  }

  getOptionValue (i: number) {
    const option = this.field.options![ i ] as { value: string }
    return option.value
  }

  getOptionLabel (i: number) {
    const option = this.field.options![ i ] as { label: string }
    return option.label
  }

  doAddChip (event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input
      const value = event.value

      // add our value
      if ((value || '').trim()) {
        this.chipValues.push(value.trim())
        this.setFieldValue(this.chipValues)
      }

      // Reset the input value
      if (input) {
        input.value = ''
      }
      this.chipControl.setValue(null)
    }
  }

  doRemoveChip (value: string): void {
    const index = this.chipValues.indexOf(value)

    if (index >= 0) {
      this.chipValues.splice(index, 1)
      this.setFieldValue(this.chipValues)
    }
  }

  doChipSelected (event: MatAutocompleteSelectedEvent) {
    this.chipValues.push(event.option.viewValue)
    this.setFieldValue(this.chipValues)
    this.chipInput.nativeElement.value = ''
    this.chipControl.setValue(null)
  }

  setFieldValue (value: any) {
    this.form.controls[ this.fieldId ].setValue(value)
  }

  private _filterWithGroups (value: string) {
    // TODO: remove selected values
    const filterValue = value.toLowerCase()

    return this.allChipValuesWithGroup
      .map(group => {
        const filteredOptions = group.options.filter(option =>
          option.label.toLowerCase().indexOf(filterValue) !== -1
        )

        if (filteredOptions.length > 0) {
          return {
            group: group.group,
            options: filteredOptions
          }
        } else {
          return undefined
        }
      })
      // remove empty groups
      .filter(group => group) as { group: string, options: { value: any, label: string }[] }[]
  }

  private _filter (value: string) {
    // TODO: remove selected values
    const filterValue = value.toLowerCase()
    return this.allChipValues.filter(option => option.label.toLowerCase().indexOf(filterValue) !== -1)
  }

  private get allChipValuesWithGroup () {
    return this.field.options as { group: string, options: { value: any, label: string }[] }[]
  }

  private get allChipValues () {
    return this.field.options as { value: any, label: string }[]
  }

  private isChipWithGroups () {
    const anyOptions = this.field.options as any

    // check if signature for options matches { group: string, options: { value: any, label: string }[] }
    assert(Array.isArray(anyOptions), `Chip options must be an array [${this.field.id}]`)
    return typeof anyOptions[ 0 ].group === 'string'
  }
}
