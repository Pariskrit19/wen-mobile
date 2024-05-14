import { monthNames, weekDayNames } from 'constants/dates'
import { FullDaysConstant, lightMode, modeDark } from 'helpers/constants'
import { getDayWithSuffix } from 'helpers/utils'
import moment from 'moment'

export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  value === '' ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

// example function
export const getTestFunction = () => {
  return {}
}

export function MuiFormatDate(d?: any) {
  const date = d ? new Date(d) : new Date()
  let dd: any = date.getDate()
  let mm: any = date.getMonth() + 1
  const yyyy = date.getFullYear()
  if (dd < 10) {
    dd = `0${dd}`
  }
  if (mm < 10) {
    mm = `0${mm}`
  }
  return `${yyyy}-${mm}-${dd}`
}
export const getOfficeYearns = () => {
  let yearList = []
  const yearDate = new Date().getFullYear()
  for (let i = 2011; i <= yearDate; ++i) {
    yearList.push({ label: `${i}`, value: `${i}` })
  }
  return yearList
}

export const getAbbreviatedName = (name: string) => {
  const nameArray = name?.split(' ')
  const firstLetter = nameArray && nameArray[0]?.charAt(0)
  const lastLetter =
    nameArray && nameArray?.length > 1 ? nameArray[nameArray?.length - 1]?.charAt(0) : ''

  return `${firstLetter}${lastLetter}`.toUpperCase()
}

export const handleScreenFade = ({ current, next, layouts }: any) => ({
  cardStyle: {
    transform: [
      {
        translateY: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.height / 4, 0],
        }),
      },
    ],
    opacity: current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  },
  overlayStyle: {
    opacity: current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  },
})

export const getDarkModeStatus = (darkmodeStatus: string | null, deviceDarkMode: boolean) => {
  return darkmodeStatus === lightMode ? false : darkmodeStatus === modeDark ? true : deviceDarkMode
}

export const getLeaveDayFormat = (date: string) => {
  const dateObj = new Date(date).toString()
  const dateObjSplitted = dateObj.split(' ')
  const day = weekDayNames[dateObjSplitted[0]]
  const monthDate = dateObjSplitted[2]
  const monthName = dateObjSplitted[1]
  return `${day},${monthDate} ${monthName}`
}

export const getShortMonthName = () => {}

export const getLeaveDuration = (leave: string) => {
  if (leave === 'first-half') return 'First Half'
  else if (leave === 'second-half') return 'Second Half'
  else return 'Full Day'
}

export const intervalBetweenDays = (date1, date2) => {
  return moment(date2).startOf('day').diff(moment(date1).startOf('day')) / (1000 * 60 * 60 * 24)
}

export const differenceInDays = (date1, date2, isNotice?: Boolean) => {
  const difference =
    moment(date2).startOf('day').diff(moment(date1).startOf('day')) / (1000 * 60 * 60 * 24)

  if (isNotice && difference < 0) return 'Today'

  return difference === 0
    ? 'Today'
    : difference < 0
    ? difference === -1
      ? 'Yesterday'
      : `Last ${FullDaysConstant[new Date(date2).getDay()]}`
    : difference === 1
    ? `${difference} day to go.`
    : `${difference} days to go.`
}

export const getUpcomingActivitiesDateFormate = (date: Date | string) => {
  const stringDate = new Date(date).toString().split(' ')
  const weekDay = weekDayNames[stringDate[0]]
  const monthDate = stringDate[2]
  const weekDate = getDayWithSuffix(parseInt(stringDate[2]))
  const month = stringDate[1]
  return [monthDate, weekDate, month, weekDay]
}

export const getDateFromMoment = (date: string) => {
  return date?.split('T')?.[0]
}

export const getTimeFromMoment = (date: string) => {
  return date?.split('T')?.[1]?.slice(0, -1)
}
