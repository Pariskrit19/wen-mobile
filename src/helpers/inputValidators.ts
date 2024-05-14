import { genericObj } from 'ts/types/index'
import { isEmpty } from 'utils'
import {
  EmailRegexValidaion,
  minutesNumber,
  numberAndDecimals,
  numbersOnly,
  passwordRegexValidation,
  PhoneNumberRegexValidation,
  positiveNumber,
  singleNumber,
} from './regex'

export const InputValidator = async (formValues: genericObj) => {
  const validationFields = Object.keys(formValues).filter(
    (item) => formValues[item]?.isRequired || formValues[item]?.isVital
  )

  const errors: any = {}
  const fields = validationFields.map((key: any) => ({
    id: key,
    value: formValues[key]?.value,
    isRequired: formValues[key]?.isRequired,
  }))

  if (fields) {
    Promise.all(
      fields.map(async (field) => {
        const conditions: string[] = field?.isRequired ? ['required'] : []
        conditions.push(field.id.toLowerCase())
        if (conditions) {
          Promise.all(
            conditions.map((condition) => {
              const errMsg = validationConditions(condition, field.value)
              if (errMsg) {
                errors[field.id] = errMsg
              }
            })
          )
        }
      })
    )
  }
  return errors
}

const validationConditions = (condition: string, value: any) => {
  switch (condition) {
    case 'required': {
      return !value || isEmpty(value) ? 'Required' : ''
    }

    case 'email': {
      const isValid = !isEmpty(value) ? EmailRegexValidaion(value) : true
      return !isValid ? 'Invalid Email' : ''
    }

    case 'numberAndDecimals': {
      const isValid = !isEmpty(value) ? numberAndDecimals(value) : true
      return isEmpty(value) ? 'Required' : !isValid ? 'Numbers Only' : ''
    }

    case 'numbers': {
      const isValid = !isEmpty(value) ? numbersOnly(value) : true
      return !value ? 'Required' : !isValid ? 'Numbers Only' : ''
    }

    case 'posNumbers': {
      const isValid = !isEmpty(value) ? positiveNumber(value) : true
      return !isValid ? 'Positive Number Only' : ''
    }

    case 'yearNum': {
      const isValid = !isEmpty(value) ? numbersOnly(value) && value.toString().length == 4 : true
      return !value ? 'Required' : !isValid ? 'Invalid Year' : ''
    }

    case 'phone': {
      const isValid = PhoneNumberRegexValidation(value)
      return isEmpty(value) ? 'Required' : isValid ? '' : 'Invalid Phone no.'
    }

    case 'usersecondaryphone': {
      const isValid = isEmpty(value) ? true : PhoneNumberRegexValidation(value)
      return !isValid ? 'Invalid Phone no.' : ''
    }

    case 'upToCurrentYear': {
      const isValid = !isEmpty(value) ? numbersOnly(value) && value.toString().length == 4 : true
      return !value
        ? 'Required'
        : !isValid
        ? 'Invalid Year'
        : new Date().getFullYear() < value
        ? "Can't exceed current date"
        : ''
    }
    case 'password': {
      const isValid = !isEmpty(value) ? value.length >= 8 : true
      return !isValid ? ' Password must contain minimum eight characters' : ''
    }
    case 'remarks':
    case 'leavereason':
    case 'punchnote':
    case 'cancelreapplyreason': {
      const isValid = !isEmpty(value)
      return !isValid
        ? 'Required'
        : value.length < 10
        ? `${condition === 'remarks' ? 'Remarks' : 'Reason'} should be at least 10 letters!`
        : ''
    }

    case 'loghours': {
      const isValid = !isEmpty(value) ? singleNumber(value) : true
      return !isValid ? 'Log Hours cannot exceed 9' : ''
    }
    case 'logminutes': {
      const isValid = !isEmpty(value) ? minutesNumber(value) : true
      return !isValid ? 'Minutes should be either 0, 15, 30, 45' : ''
    }
    default:
      return ''
  }
}
