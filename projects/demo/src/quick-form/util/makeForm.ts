/**
 * Convert QuickFormField[] to FormBuilder's controls config.
 *
 * @param fields
 */
import { QuickFormField } from '../QuickFormField'
import { FormBuilder } from '@angular/forms'
import { setDefaultValues } from './setDefaultValues'

export const makeForm = (fields: QuickFormField[]) => {
  const fb = new FormBuilder()
  const form: any = {}

  setDefaultValues(fields)

  fields.map(field => {
    if (field.type === 'checkbox') {
      // will always be options2 type because of #conversion
      const options2 = field.options as { value: string, label: string }[] || []
      const options = options2.map(option => {
        const values = Array.isArray(field.value) ? field.value : [ field.value ]
        return fb.group({
          checkboxItem: [ values.indexOf(option.value) !== -1 ? option.value : '' ]
        })
      })
      form[ field.id! ] = fb.array(options, [
        ...(field.validators) || []
      ], [
        ...(field.asyncValidators) || []
      ])
    } else {
      // single control field
      form[ field.id! ] = [ field.value || '', [
        ...(field.validators || [])
      ], [
        ...(field.asyncValidators || [])
      ] ]
    }
  })

  return fb.group(form)
}
