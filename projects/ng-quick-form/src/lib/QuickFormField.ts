import { AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms'
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
  floatLabel?: 'always' | 'never' | 'auto'

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

  /**
   * Experimental feature to display custom message below field.
   * @param formGroup
   */
  customMessage?: (formGroup: FormGroup) => string
}
