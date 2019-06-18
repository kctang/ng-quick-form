import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  Input, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms'
import { QuickFormField } from '../QuickFormField'
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'
import { Observable, Subscription } from 'rxjs'
import { map, startWith, tap, throttleTime } from 'rxjs/operators'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { getErrorMessage } from '../util/getErrorMessage'
import { assert } from '../util/assert'
import { resolvedOptions } from '../util/resolveOptions'

@Component({
  selector: 'quick-form-field',
  templateUrl: './QuickFormField.component.html',
  styleUrls: [ './QuickFormField.component.scss' ],
  // TODO: proper fix for hack to avoid error message 'sometimes' not showing.
  changeDetection: ChangeDetectionStrategy.Default
})
export class QuickFormFieldComponent implements OnInit, OnDestroy {
  protected _subs: Subscription[] = []

  @Input()
  form!: FormGroup

  @Input()
  field!: QuickFormField

  separatorKeysCodes: number[] = [ ENTER, COMMA ]

  @ViewChild('chipInput', { static: false })
  chipInput!: ElementRef<HTMLInputElement>
  @ViewChild('auto', { static: false })
  matAutocomplete!: MatAutocomplete
  chipControl = new FormControl()
  chipValues: string[] = []
  chipWithGroups = false
  filteredChipValuesWithGroup!: Observable<{ group: string, options: { value: any, label: string }[] }[]>
  filteredChipValues!: Observable<{ value: any, label: string }[]>
  filteredFinalOptions!: Observable<{ label: string, value: any }[]>
  finalOptions: { label: string, value: any }[] = []

  constructor (private cd: ChangeDetectorRef) {
  }

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

    if (typeof this.field.optionsFn === 'function') {
      this.autoUnsubscribe(
        this.form.valueChanges.pipe(
          startWith(this.form.value),
          throttleTime(300),
          tap(values => {
            // 1. capture old options
            const previousFinalOption = this.finalOptions

            // 2. call optionsFn with current form value to get the dynamic options definition
            // 3. options definition can be 'simplified', so need to resolve each time
            this.finalOptions = resolvedOptions(this.field.optionsFn!(values))

            // 4. Check if options is change
            if (JSON.stringify(previousFinalOption) !== JSON.stringify(this.finalOptions)) {
              // 5. if field value is not part of option's value... clear the value for select
              const fieldControl = this.form.get(this.fieldId)
              if (fieldControl) {
                const isValidValue = this.finalOptions.find(finalOption => finalOption.value === fieldControl.value)
                if (!isValidValue) {
                  if (this.field.type === 'select' && fieldControl.value !== '') {
                    fieldControl.setValue('')
                  }
                }
              }
              this.filterAutoCompleteOptions()
            }

            this.cd.markForCheck()
          })
        )
      )
    } else {
      // this.field.options is statically resolved, just set it once
      this.finalOptions = this.field.options as { label: string, value: any }[]
    }

    this.filterAutoCompleteOptions()
  }

  private filterAutoCompleteOptions () {
    if (this.field.type === 'autocomplete') {
      this.filteredFinalOptions = (this.form.get(this.fieldId) as FormControl).valueChanges.pipe(
        startWith(''),
        map(value => {
          const filterValue = value.toLowerCase()
          return this.finalOptions.filter(option => option.label.toLowerCase().includes(filterValue))
        })
      )
    }
  }

  ngOnDestroy () {
    if (this._subs.length > 0) {
      this._subs.map(sub => sub.unsubscribe())
      this._subs.length = 0
    }
  }

  autoUnsubscribe (...subs: (Subscription | Observable<any>)[]) {
    subs.map(sub => {
      if (sub instanceof Subscription) {
        this._subs.push(sub)
      } else {
        this._subs.push(sub.subscribe(
          () => {
          },
          e => {
            throw e
          }
        ))
      }
    })
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

  getCbOptionValue (i: number) {
    const option = this.field.options![ i ] as { value: string }
    return option.value
  }

  getCbOptionLabel (i: number) {
    const option = this.field.options![ i ] as { label: string }
    return option.label
  }

  doUpdateCb (i: number, checked: boolean) {
    // update field that stores checkbox values that will be returned to user
    const option = this.field.options![ i ] as { value: any, label: string }
    const control = this.form.get(this.fieldId) as FormControl
    const values = new Set(control.value)
    if (checked) {
      values.add(option.value)
    } else {
      values.delete(option.value)
    }
    control.setValue(Array.from(values))
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
