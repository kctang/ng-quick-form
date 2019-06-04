import { QuickFormFieldOptionDefinition } from '../QuickFormFieldOptionDefinition'

export const resolvedOptions = (options: QuickFormFieldOptionDefinition[]) => {
  return options.map<any>(option => {
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
}
