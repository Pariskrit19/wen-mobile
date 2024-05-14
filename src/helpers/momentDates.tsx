import moment from 'moment'

const month = moment().format('MMMM')
const year = moment().format('YYYY')
const date = moment().format('DD')
const day = moment().format('dddd')

export const getSpecificDate = (date: any, format: string) => {
  return moment(date).format(format)
}
