import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms'
import { assert } from '../util/assert'

/**
 * This is only applicable to quick form checkbox field types.
 */
// @dynamic
export class CheckboxValidators {
  /**
   * Validates that 'checkbox' quick form field has the specified minimum number of selected values.
   *
   * @param min Minimum number of selected values required to pass validation.
   */
  public static minSelectedValues (min: number): ValidatorFn {
    return (control: AbstractControl) => {
      assert(control instanceof FormArray,
        'CheckboxValidators.minSelectedValues() can only be used with checkbox field types')

      const array = control as FormArray
      const count = array.controls.filter(c => !!c.value.cb).length
      return count >= min ? null : {
        [ `At least ${min} item(s) must be selected` ]: true
      }
    }
  }
}
