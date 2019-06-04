import { AsyncValidatorFn, ValidatorFn } from '@angular/forms'
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
   * Field type. Valid values are 'checkbox', 'chips', 'password', 'radio', 'select', 'separator',
   * 'switch', 'text' and 'textarea'. Optional. Defaults to 'text'.
   */
  type?: QuickFormFieldType

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
}
