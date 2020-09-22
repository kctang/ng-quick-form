import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  Input, OnChanges, OnDestroy,
  SimpleChanges, ViewChild
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
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    '[attr.grow]': 'flexCell.grow === true ? true : null',
    '[attr.shrink]': 'flexCell.shrink === true ? true : null',
    '[attr.cell-1]': 'flexCell.cell === 1 ? true : null',
    '[attr.cell-2]': 'flexCell.cell === 2 ? true : null',
    '[attr.cell-3]': 'flexCell.cell === 3 ? true : null',
    '[attr.cell-4]': 'flexCell.cell === 4 ? true : null',
    '[attr.cell-5]': 'flexCell.cell === 5 ? true : null',
    '[attr.cell-6]': 'flexCell.cell === 6 ? true : null',
    '[attr.cell-7]': 'flexCell.cell === 7 ? true : null',
    '[attr.cell-8]': 'flexCell.cell === 8 ? true : null',
    '[attr.cell-9]': 'flexCell.cell === 9 ? true : null',
    '[attr.cell-10]': 'flexCell.cell === 10 ? true : null',
    '[attr.cell-11]': 'flexCell.cell === 11 ? true : null',
    '[attr.cell-12]': 'flexCell.cell === 12 ? true : null',
    '[class]': 'cssClass !== null ? cssClass : null'
  }
})
export class QuickFormFieldComponent implements OnChanges, OnDestroy {
  protected _onChangesSubs: Subscription[] = []

  @Input()
  form!: FormGroup

  @Input()
  field!: QuickFormField

  flexCell = {
    shrink: null as null | boolean,
    grow: null as null | boolean,
    cell: null as null | number
  }
  cellPerOption = 2
  cssClass = null as null | string | string[]

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

  autoUnsubscribeOnChanges (...subs: (Subscription | Observable<any>)[]) {
    subs.map(sub => {
      if (sub instanceof Subscription) {
        this._onChangesSubs.push(sub)
      } else {
        this._onChangesSubs.push(sub.subscribe(
          () => {
          },
          e => {
            throw e
          }
        ))
      }
    })
  }

  ngOnChanges (changes: SimpleChanges): void {
    // clean up first
    this.unsubscribeOnChanges()

    // configure field layout
    if (this.field.layout) {
      this.flexCell.shrink = this.field.layout.shrink ? true : null
      this.flexCell.grow = this.field.layout.grow ? true : null
      if (typeof this.field.layout.cell === 'number') {
        this.flexCell.cell = this.field.layout.cell
      }
      if (typeof this.field.layout.cellPerOption === 'number') {
        this.cellPerOption = this.field.layout.cellPerOption
      }
      if (typeof this.field.layout.cssClass === 'string') {
        this.cssClass = this.field.layout.cssClass
      }
    }

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
      this.autoUnsubscribeOnChanges(
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

  ngOnDestroy (): void {
    this.unsubscribeOnChanges()
  }

  private unsubscribeOnChanges () {
    // unsubscribe previous changes first
    if (this._onChangesSubs.length > 0) {
      this._onChangesSubs.map(sub => sub.unsubscribe())
      this._onChangesSubs.length = 0
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

  getHintLabel () {
    return this.field.hintLabel ?
      this.field.hintLabel : (this.field.lengthIndicator ? `Max ${this.field.lengthIndicator.maxLength} characters` : undefined)
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

  get hasCustomMessage () {
    return typeof this.field.customMessage === 'function'
  }

  get customMessage () {
    return this.field.customMessage!(this.form)
  }
}
