export const code = {
  simpleDemo: {
    html: `<div padding>
    <!--
    flex-cell and related attributes are features provided by https://common-style-attributes.surge.sh/
    -->
    <div flex-cell default-cell-6 gutter>
        <form [formGroup]="form" flex-cell gutter default-cell-6>
            <quick-form-field *ngFor="let field of fields"
                              [field]="field"
                              [form]="form">
            </quick-form-field>
        </form>
        <div>
            <div *ngIf="valid; else invalid" green>Form is valid.</div>
            <ng-template #invalid>
                <div red>Form is not valid.</div>
            </ng-template>
            <pre no-margin><code [highlight]="values"></code></pre>
        </div>
    </div>
</div>`,

    ts: `import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { FormGroup, Validators } from '@angular/forms'
import { QuickForm, QuickFormField } from 'ng-quick-form'

@Component({
  selector: 'app-simple-demo',
  templateUrl: 'simple-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleDemoComponent implements OnInit {
  form!: FormGroup
  fields: QuickFormField[] = [
    {
      title: 'Name',
      validators: [
        Validators.minLength(3),
        Validators.maxLength(10)
      ]
    },
    {
      title: 'Country', type: 'select',
      options: [ 'Australia', 'Finland', 'Kenya', 'Malaysia', 'Peru' ]
    },
    {
      title: 'Last Zoo Visit', type: 'datepicker',
      required: true,
      validators: [
        Validators.required,
        control => {
          const { value } = control
          if (value instanceof Date) {
            const now = new Date()
            if (now.getUTCFullYear() === value.getUTCFullYear() &&
              now.getUTCMonth() === value.getUTCMonth() &&
              now.getUTCDate() === value.getUTCDate()) {
              return null
            } else {
              return { 'Only today is a valid value': true }
            }
          } else {
            return { 'I need a date!': true }
          }
        }
      ]
    },
    {
      title: 'State', type: 'select',
      // options for state changes based on selected country
      optionsFn: (values: any) => {
        switch (values.country) {
          case 'Australia':
            return [ 'Perth', 'Sydney', 'Atlantis' ]
          case 'Malaysia':
            return [ 'Selangor', 'Kuala Lumpur', 'Atlantis' ]
          default:
            return [ 'Other State 1', 'Other State 2' ]
        }
      }
    },
    {
      title: 'Front End', type: 'checkbox',
      options: [ 'React', 'Angular', 'Vue', 'Ember.js', 'jQuery' ],
      value: 'Angular',
      layout: {
        cell: 12,
        cellPerOption: 4
      }
    },
    {
      title: 'Series/Movies', type: 'chips',
      value: [ 'Game of Thrones' ],
      options: [
        {
          group: 'TV Series',
          options: [
            'Game of Thrones',
            'Black Summer',
            'Chilling Adventures of Sabrina',
            'Star Trek: Discovery',
            'The Act',
            'The Walking Dead',
            'Line of Duty'
          ]
        }, {
          group: 'Movies',
          options: [
            'Avengers: Infinity War',
            'Deadpool 2',
            'Solo: A Star Wars Story',
            'Ocean\\'s 8',
            'Hereditary',
            'Incredibles 2',
            'Jurassic World: Fallen Kingdom',
            'Sicario 2: Soldado'
          ]
        }
      ],
      layout: {
        cell: 12
      }
    }
  ]

  ngOnInit (): void {
    this.form = QuickForm.makeForm(this.fields)
  }

  get values () {
    return JSON.stringify(QuickForm.preProcessFormValues(this.form.value), null, 2)
  }

  get valid () {
    return this.form.valid
  }
}`
  },

  fieldTypes: {
    html: `<div padding>
    <div flex-cell default-cell-6 gutter>
        <form [formGroup]="form">
            <quick-form-field *ngFor="let field of fields" [field]="field" [form]="form">
            </quick-form-field>
        </form>
        <div>
            <div *ngIf="valid; else invalid" green>Form is valid.</div>
            <ng-template #invalid>
                <div red>Form is not valid.</div>
            </ng-template>
            <pre no-margin><code [highlight]="values"></code></pre>
        </div>
    </div>
</div>
`,

    ts: `import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup, Validators } from '@angular/forms'
import { QuickForm, QuickFormField, CheckboxValidators } from 'ng-quick-form'

@Component({
  selector: 'app-field-types-demo',
  templateUrl: './field-types-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldTypesDemoComponent implements OnInit {
  form!: FormGroup
  fields: QuickFormField[] = [
    {
      title: 'Name', required: true,
      validators: [
        Validators.minLength(3),
        Validators.maxLength(10)
      ]
    },
    {
      title: 'Good', disabled: true,
      value: 'Good',
      suffixIcon: 'sentiment_very_satisfied', suffixIconTooltip: 'Happy'
    },
    { title: 'Hungry?', type: 'switch' },
    { title: 'Programming Questions', type: 'separator' },
    {
      title: 'Front End', type: 'checkbox',
      options: [ 'React', 'Angular', 'Vue', 'Ember.js', 'jQuery' ],
      validators: [ CheckboxValidators.minSelectedValues(1) ],
      value: 'Angular'
    },
    {
      title: 'Real Programming Languages', type: 'chips',
      options: [ 'PHP', 'Cobol', 'Java', '.NET', 'C', 'C++' ]
    },
    {
      title: 'Prefers', type: 'radio', required: true,
      options: [ 'Front End', 'Back End', 'Full Stack', 'Whatever' ]
    },
    { title: 'Pet', type: 'separator' },
    {
      title: 'Animal Type', type: 'autocomplete',
      placeholder: 'Enter value to filter',
      floatLabel: 'always',
      options: [ 'Fish', 'Insect', 'Mammal' ]
    },
    {
      title: 'Animal', type: 'autocomplete',
      // options for animal changes based on selected animal type
      optionsFn: (values: any) => {
        switch (values.animalType) {
          case 'Fish':
            return [ 'Gold Fish', 'Nemo' ]
          case 'Insect':
            return [ 'Ant', 'Bee', 'Spider' ]
          case 'Mammal':
            return [ 'Cat', 'Dog', 'Monkey' ]
          default:
            return [ ]
        }
      }
    },
    { title: 'Entertainment', type: 'separator' },
    {
      title: 'Series/Movies', type: 'chips',
      value: [ 'Game of Thrones' ],
      options: [
        {
          group: 'TV Series',
          options: [
            'Game of Thrones',
            'Black Summer',
            'Chilling Adventures of Sabrina',
            'Star Trek: Discovery',
            'The Act',
            'The Walking Dead',
            'Line of Duty'
          ]
        }, {
          group: 'Movies',
          options: [
            'Avengers: Infinity War',
            'Deadpool 2',
            'Solo: A Star Wars Story',
            'Ocean\\'s 8',
            'Hereditary',
            'Incredibles 2',
            'Jurassic World: Fallen Kingdom',
            'Sicario 2: Soldado'
          ]
        }
      ]
    },
    {
      title: 'Oscar Nominees', type: 'select', selectMultiple: true, required: true,
      options: [
        'Avengers: Infinity War',
        'Deadpool 2',
        'Solo: A Star Wars Story',
        'Ocean\\'s 8'
      ]
    },
    {
      title: 'Winner', type: 'select', required: true,
      options: [
        'Avengers: Infinity War',
        'Deadpool 2',
        'Solo: A Star Wars Story',
        'Ocean\\'s 8'
      ]
    },
    {
      title: 'Comments', type: 'textarea'
    }
  ]

  ngOnInit (): void {
    this.form = QuickForm.makeForm(this.fields)
  }

  get values () {
    return JSON.stringify(QuickForm.preProcessFormValues(this.form.value), null, 2)
  }

  get valid () {
    return this.form.valid
  }
}
`
  },

  quickFormField: `import { AsyncValidatorFn, ValidatorFn } from '@angular/forms'
import { QuickFormFieldType } from './QuickFormFieldType'
import { QuickFormFieldOptionDefinition } from './QuickFormFieldOptionDefinition'

/**
 * QuickFormField represents definition for a field.
 */
export type QuickFormField = {
  /**
   * Label for the field. Required.
   */
  title: string

  /**
   * Unique identifier for the field. Optional. Defaults to camel case representation of title.
   */
  id?: string

  /**
   * Field type. Valid values are 'checkbox', 'chips', 'datepicker', 'password', 'radio',
   * 'select', 'separator', 'switch', 'text' and 'textarea'. Optional. Defaults to 'text'.
   */
  type?: QuickFormFieldType

  /**
   * Placeholder for the field. Use title if value not define.
   */
  placeholder?: string

  /**
   * Default value for the field when the form is displayed. Optional.
   */
  value?: any | any[]

  /**
   * List of possible options for 'radio', 'checkbox', 'chips' and 'select' field types.
   *
   * Note: While some field types allow different values for display (label) and form data
   * (value), 'chip' type uses label for both display and as form data.
   *
   * Options can be specified as:
   * <li> array of string</li>
   * <li> array of object with 'value' and 'label' as keys</li>
   * <li> array of object with 'group' and 'options' as keys (see type definition)</li>
   *
   * Optional.
   */
  options?: QuickFormFieldOptionDefinition[]

  /**
   * For advanced use case, options can be specified as return value for a function that
   * receives form values as input.
   *
   * If both options and optionsFn is specified, optionsFn will be used instead.
   *
   * Optional.
   *
   * @param formValues Current form values.
   */
  optionsFn?: (formValues: any) => QuickFormFieldOptionDefinition[]

  /**
   * Flag to indicate that field input is required. Optional. Defaults to false.
   */
  required?: boolean

  /**
   * Flag to indicate that field input is disabled. Optional. Defaults to false.
   */
  disabled?: boolean

  /**
   * For 'select' field type, true to allow multiple selection.
   */
  selectMultiple?: boolean

  /**
   * Array of Angular validation functions (i.e. ValidatorFn). Optional.
   */
  validators?: ValidatorFn[]

  /**
   * Array of asynchronous Angular validation functions (i.e. AsyncValidatorFn). Optional.
   */
  asyncValidators?: AsyncValidatorFn[]

  /**
   * Indicate label should always float, never float or float as the user types. Optional. Defaults to auto.
   */
  floatLabel: 'always' | 'never' | 'auto'

  /**
   * Suffix icon.
   */
  suffixIcon?: string

  /**
   * Suffix icon tooltip.
   */
  suffixIconTooltip?: string

  /**
   * Layout properties for field.
   *
   * Layout is managed via common-style-attributes (https://common-style-attributes.surge.sh/).
   */
  layout?: {
    /**
     * CSS class for field.
     */
    cssClass?: string

    /**
     * Number of cell this field should take up, using the flex-cell grid system.
     */
    cell?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    /**
     * If true, grow field width to use up remaining space in row.
     */
    grow?: boolean
    /**
     * If true, shrink field width minimum required by the field.
     */
    shrink?: boolean
    /**
     * Number of cell each option should take up.
     *
     * cellPerOption is only applicable to fields that display options (i.e. radio, checkbox).
     */
    cellPerOption?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }
}`,

  quickFormFieldOptionDefinition: `/**
 * Supported form field option definition styles.
 */
export type QuickFormFieldOptionDefinition = (
  // shorthand - string value will be used for both "value" and "label"
  string |

  // specify values for "value" and "label"
  { value: any, label: string } |

  // shorthand style within an option group
  { group: string, options: string[] } |

  // option group where value and labels must be specified separately
  { group: string, options: { value: any, label: string }[] }
  )
`,

  quickFormFieldType: `/**
 * Supported field types.
 */
export type QuickFormFieldType =
  'autocomplete'
  | 'checkbox'
  | 'chips'
  | 'datepicker'
  | 'password'
  | 'radio'
  | 'select'
  | 'separator'
  | 'switch'
  | 'text'
  | 'textarea'
`
}
