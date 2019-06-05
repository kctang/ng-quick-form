/**
 * Convert QuickFormField[] to FormBuilder's controls config.
 *
 * @param fields
 */
import { QuickFormField } from './QuickFormField'
import { FormBuilder } from '@angular/forms'
import { setDefaultValues } from './setDefaultValues'
import { assert } from './util/assert'

export const makeForm = (fields: QuickFormField[]) => {
  const fb = new FormBuilder()
  const form: any = {}

  setDefaultValues(fields)

  fields.map(field => {
    if (field.type === 'checkbox' || field.type === 'chips') {
      assert(typeof field.optionsFn !== 'function',
        `"optionsFn" cannot be used by field [${field.id}]. Not supported by checkbox and chips field types.`
      )
    }

    const fieldId = field.id!

    switch (field.type) {
      case 'separator':
        // _ indicates field value is not returned to user
        form[ `__separator-${field.id}` ] = [ '' ]
        break
      case 'checkbox':
        // validators not added to internal field
        form[ fieldId ] = [ field.value ]

        // checkbox is backed by additional fields
        if (field.type === 'checkbox') {
          const options2 = field.options as { value: string, label: string }[]

          const options = options2.map(option => {
            const checked = field.value.indexOf(option.value) !== -1
            return fb.group({
              cb: [ { value: checked, disabled: field.disabled } ]
            })
          })

          // validators added to array instead
          form[ `__cb-${fieldId}` ] = fb.array(options,
            [ ...(field.validators || []) ],
            [ ...(field.asyncValidators || []) ]
          )
        }
        break

      default:
        form[ fieldId ] = [
          { value: field.value || '', disabled: field.disabled },
          [ ...(field.validators || []) ],
          [ ...(field.asyncValidators || []) ]
        ]
    }
  })

  return fb.group(form)
}
