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
    // set default field ID
    if (!field.id) {
      field.id = camelize(field.title)
    }

    // set default field type
    if (!field.type) {
      field.type = 'text'
    }

    // set default field options
    field.options = field.options || []
    field.options = field.options.map<any>(option => {
      if (typeof option === 'string') {
        // convert to { value: string, label: string }
        return { label: option, value: option }
      } else {
        // convert options in groups if specified as string
        const groupOption = option as { group: string, options: any[] }
        if (groupOption.group && Array.isArray(groupOption.options)) {
          groupOption.options = groupOption.options.map(option => {
            if (typeof option === 'string') {
              return { label: option, value: option }
            } else {
              return option
            }
          })
        }
        return groupOption
      }
    })

    // set default values for field
    if (field.type === 'checkbox' || field.type === 'chips') {
      if (field.value === undefined) {
        field.value = []
      }
      field.value = Array.isArray(field.value) ? field.value : [ field.value ]
    }

    return field
  })
}
