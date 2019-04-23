import { AsyncValidatorFn, ValidatorFn } from '@angular/forms'
import { QuickFormFieldType } from './QuickFormFieldType'

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
   * Field type. Valid values are 'text', 'textarea', 'switch', 'radio', 'checkbox', 'select' and
   * 'password'. Optional. Defaults to 'text'.
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
  options?: (
    string |
    { value: any, label: string } |
    { group: string, options: string[] } |
    { group: string, options: { value: any, label: string }[] }
    )[]

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
