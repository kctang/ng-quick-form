/**
 * Pre-process form values on form submission to convert raw form values to a structure that
 * mimics field definitions.
 */
import { QuickFormField } from '../QuickFormField'

export const preProcessFormValues = (formValues: any, fields: QuickFormField[]) => {
  const updatedFormValues = { ...formValues }

  fields.map(field => {
    // transform checkbox values
    // if (field.type === 'checkbox') {
    //   const values: { checkboxItem: boolean }[] = updatedFormValues[ field.id! ]
    //
    //   formValues[ field.id! ] = values
    //     .map((val, idx) => ({
    //       checkboxItem: val.checkboxItem,
    //       index: idx
    //     }))
    //     .filter(val => val.checkboxItem)
    //     .reduce((previousValue, currentValue) => {
    //       // always contain value because of #conversion
    //       const options2 = field.options as { value: string, label: string }[] || []
    //       const option = options2[ currentValue.index ]
    //       return [
    //         ...previousValue,
    //         option.value
    //       ]
    //     }, [] as string[])
    // }
  })

  return updatedFormValues
}
