export const EmailRegexValidaion = (email: string) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const PhoneNumberRegexValidation = (phone: string) => {
  var re = /^((\\+)|(00)|(\\*)|())[0-9]{10,14}((\\#)|())$/
  return re.test(phone)
}

export const numberToNepaliCurrency = (number: string) => {
  let rst = parseFloat(number)
    .toFixed(2)
    // .replace(/\D/g, "")
    .replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, '$1,')

  return rst
}

export const numberAndDecimals = (number: string) => {
  let re = /^([0-9]\d*)(\.\d+)?$/
  return re.test(number)
}

export const numbersOnly = (number: string) => {
  let re = /^([0-9]\d*)?$/
  return re.test(number)
}

export const singleNumber = (number: string) => {
  let re = /^([0-9])$/
  return re.test(`${parseInt(number)}`)
}

export const minutesNumber = (number: string) => {
  let re = /^(0|15|30|45)$/
  return re.test(`${parseInt(number)}`)
}

export const positiveNumber = (number: string) => {
  let re = /^([1-9]\d*)?$/
  return re.test(number)
}

export function hasNumber(myString: string) {
  return /\d/.test(myString)
}

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
export function passwordRegexValidation(myString: string) {
  let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return re.test(myString)
}
