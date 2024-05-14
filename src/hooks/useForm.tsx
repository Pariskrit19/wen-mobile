import { InputValidator } from 'helpers/inputValidators'
import React, { useEffect } from 'react'
import { isEmpty } from 'utils'

const useForm = (
  initialState: any,
  validate?: Function | undefined,
  onSubmitCallback?: Function | undefined
) => {
  const [values, setValues] = React.useState(initialState)
  const [errors, setErrors] = React.useState<typeof initialState>({})
  const [isSubmitting, setSubmitting] = React.useState(false)
  const [isSubmitted, setSubmitted] = React.useState(false)

  // React.useEffect(() => {
  //   if (isSubmitting) {
  //     const noErrors = Object.keys(errors).length === 0
  //     if (noErrors) {
  //       console.log('no error')
  //       setSubmitting(false)
  //     } else {
  //       console.log('error')
  //       setSubmitting(true)
  //     }
  //   }
  // }, [errors])

  const onChange = async (name: string, value: any) => {
    const inputValue = Array.isArray(value)
      ? [...values[name], ...value]
      : typeof values[name] === 'object' && values[name]
      ? { ...values[name], value }
      : value

    const newValues = {
      ...values,
      [name]: inputValue,
    }
    setValues((prev: any) => ({
      ...prev,
      [name]: inputValue,
    }))
    if (isSubmitted) {
      let validationErrors = {}
      if (isEmpty(validate)) {
        validationErrors = await InputValidator(newValues)
      } else {
        validationErrors =
          validate &&
          validate({
            ...values,
            [name]: value,
          })
      }
      setErrors(validationErrors)
    }
  }
  const clearValues = () => {
    setValues(initialState)
    setSubmitting(false)
    setSubmitted(false)
  }

  const onBlur = async () => {
    let validationErrors = {}
    if (isEmpty(validate)) {
      validationErrors = await InputValidator({})
    } else {
      validationErrors = validate && validate(values)
    }

    setErrors(validationErrors)
  }

  async function onSubmit() {
    let validationErrors = {}
    if (isEmpty(validate)) {
      validationErrors = await InputValidator(values)
    } else {
      validationErrors = validate && validate(values)
    }

    setErrors(validationErrors)

    setSubmitted(true)
    if (isEmpty(validationErrors)) {
      setSubmitting(true)
      return onSubmitCallback && onSubmitCallback()
    }
  }

  return {
    onSubmit,
    onChange,
    onBlur,
    clearValues,
    values,
    errors,
    isSubmitting,
    setSubmitting,
  }
}

export default useForm
