import clsx from 'clsx'
import React from 'react'
import { FieldError } from 'react-hook-form'

type FormHelperType = {
  helperText: string
  errorObject?: FieldError
  id?: string
}
function FormHelper({ helperText, errorObject, id }: FormHelperType) {
  return (
    <p
      className={clsx(
        'label label-text-alt',
        errorObject ? 'text-error' : null
      )}
      id={id}
    >
      {errorObject ? errorObject.message : helperText}
    </p>
  )
}

export default FormHelper
