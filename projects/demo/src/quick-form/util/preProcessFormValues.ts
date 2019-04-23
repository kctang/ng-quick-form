/**
 * Pre-process form values on form submission to convert raw form values to a structure that
 * mimics field definitions.
 */
export const preProcessFormValues = (formValues: { [ key: string ]: any }) => {
  return Object
    .keys(formValues)
    .filter(key => !key.startsWith('__'))
    .map(key => ({ [ key ]: formValues[ key ] }))
    .reduce((p, c) => Object.assign(p, c), {})
}
