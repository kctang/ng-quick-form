/**
 * Supported form field option definition styles.
 */
export type QuickFormFieldOptionDefinition = (
  // shorthand - string value will be used for both "value" and "label"
  string |

  // specify values for "value" and "label"
  { value: any, label: string } |

  // shorthand style within an option group
  { group: string, options: string[] } |

  // option group where value and labels must be specified separately
  { group: string, options: { value: any, label: string }[] }
  )
