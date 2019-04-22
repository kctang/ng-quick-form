/**
 * Pre-process dialog form fields to set default values.
 *
 * @param fields
 */
import { QuickFormField } from '../QuickFormField'

/**
 * https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 *
 * @param str
 */
const camelize = (str: string) => {
  return str.replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    function (letter, index) {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    }).replace(/\s+/g, '')
}

export const setDefaultValues = (fields: QuickFormField[]) => {
  return fields.map(field => {
    if (!field.id) {
      field.id = camelize(field.title)
    }

    if (!field.type) {
      field.type = 'text'
    }

    if (field.options) {
      // perform #conversion to { value: string, label: string }
      field.options = field.options.map(option => {
        if (typeof option === 'string') {
          return { label: option, value: option }
        } else {
          return option
        }
      })
    }

    if (field.type === 'chips') {
      // default values for chips (chips only support option's label)
      if (typeof field.value === 'string') {
        field.value = [ field.value ]
      } else if (!Array.isArray(field.value)) {
        field.value = []
      }
    }

    return field
  })
}
