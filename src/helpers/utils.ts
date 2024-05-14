import moment from 'moment'
import { MuiFormatDate } from 'utils'
import { FULL_MONTH_NAME, FullDaysConstant } from './constants'

export function changeDate(d: any) {
  const date = new Date(d)
  let dd: any = date.getDate()
  let mm: any = date.getMonth() + 1
  const yyyy = date.getFullYear()
  if (dd < 10) {
    dd = `0${dd}`
  }
  if (mm < 10) {
    mm = `0${mm}`
  }
  return `${dd}/${mm}/${yyyy}`
}

//changing data to react native dropdown format
export const dropdownFormat = (arr: any[], isProjectType?: boolean) => {
  const subLength = isProjectType ? 40 : 30
  const data = arr?.map((d: any) => ({
    value: d?._id,
    // label: d?.name,
    label: d?.name?.length > subLength ? `${d?.name?.substring(0, subLength)}...` : d?.name,
  }))
  return data
}

//array of objects to array of names in object
export const convertToNameArray = (data: any) => {
  return data.map((d: any) => d?.name)
}

export const milliSecondIntoHours = (milliSec: number) => {
  let delta = Math.abs(milliSec) / 1000

  // calculate (and subtract)  days
  let days = Math.floor(delta / 86400)
  delta -= days * 86400

  // calculate (and subtract)  hours
  let hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  // calculate (and subtract)  minutes
  let minutes = Math.floor(delta / 60) % 60

  return `${days === 0 ? '' : days === 1 ? `${days} day` : `${days} days`} ${
    hours === 0 ? '' : hours === 1 ? `${hours} hr` : `${hours} hrs`
  } ${minutes === 0 ? '' : minutes === 1 ? `${minutes} min` : `${minutes} mins`} `
}

export const checkIfTimeISBetweenOfficeHour = (
  officeStartTime = '09:10:00',
  officeEndTime = '18:00:00'
) => {
  const now = new Date()

  const startTime = officeStartTime
  const endTime = officeEndTime

  const s = startTime.split(':')
  const startTime1 = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(s[0]),
    parseInt(s[1]),
    parseInt(s[2])
  )

  const e = endTime.split(':')
  const endTime2 = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(e[0]),
    parseInt(e[1]),
    parseInt(e[2])
  )
  return now > startTime1 && now < endTime2
}

export const SATURDAY = 'SATURDAY'
export const SUNDAY = 'SUNDAY'

//get dates of month
export const getMonthDates = (fromDate: string, toDate: string) => {
  const datesArray = []
  const currentDate = new Date(fromDate)
  const endDate = new Date(toDate)
  while (currentDate <= endDate) {
    if ([0, 6].includes(currentDate.getDay())) {
      const monthEnd = moment(currentDate).isSame(moment(endDate))
      const monthStart = moment(currentDate).isSame(moment(fromDate))
      datesArray.push({
        date: `${moment(currentDate).format('YYYY-MM-DD')}`,
        isWeekend: true,
        day: currentDate.getDay() === 0 ? SUNDAY : SATURDAY,
        endOfMonth: monthEnd,
        extraDay:
          currentDate.getDay() === 0
            ? monthStart
              ? undefined
              : moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD')
            : monthEnd
            ? undefined
            : moment(currentDate).add(1, 'day').format('YYYY-MM-DD'),
      })
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return datesArray
}

export const getRangeofDates = (startDate: any, leaveDays: any, isUtc = true) => {
  let newDate = new Date(startDate)
  let endDate = new Date(newDate)
  endDate.setDate(newDate.getDate() + parseInt(leaveDays))
  let ArrayofDates = []

  let currentDate = new Date(newDate)

  while (currentDate < endDate) {
    ArrayofDates.push(
      isUtc
        ? `${MuiFormatDate(new Date(currentDate))}T00:00:00Z`
        : MuiFormatDate(new Date(currentDate))
    )
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return ArrayofDates
}

//leave card formatter
export const getleaveDataFormater = (data: any) => {
  const requireTypeData = data?.reduce((prev: any, curr: any) => {
    const titleDate = curr?.leaveDates[0]?.split('-')
    let title = titleDate[0] + '-' + titleDate[1]
    if (Object.keys(prev).includes(title)) {
      prev[title] = [...prev[title], curr]
    } else {
      prev[title] = [curr]
    }
    return prev
  }, {})

  const sectionType =
    requireTypeData &&
    Object.keys(requireTypeData)?.map((d) => {
      const dateSplit = d.split('-')
      return {
        title: `${FULL_MONTH_NAME[parseInt(dateSplit[1]) - 1]} ${dateSplit[0]}`,
        data: requireTypeData[d],
      }
    })

  return sectionType.sort(
    (a, b) => parseInt(b?.title?.split(' ')[1]) - parseInt(a?.title.split(' ')[1])
  )
}

// function for knowing halfDay
export const getHalfDayLeave = (arr: any[], leavesArr: any[], paramsData?: Object) => {
  const halfDayLeaves =
    arr.length === 1 &&
    leavesArr?.filter(
      (d: any) =>
        d?.leaveDates?.map((d: string) => d?.split('T')[0]).includes(arr?.[0]) &&
        d?._id !== paramsData?._id &&
        ['pending', 'approved'].includes(d?.leaveStatus)
    )

  if (halfDayLeaves && halfDayLeaves?.length === 1) {
    return halfDayLeaves[0]?.halfDay
  } else {
    return
  }
}

//getting leave disabled dates
export const getLeaveDisabledDays = (leaves: any[], paramsData?: Object) => {
  const approvedLeaves = leaves?.filter(
    (leave) =>
      leave?.leaveStatus === 'approved' ||
      (leave?.leaveStatus === 'pending' && leave?._id !== paramsData?._id)
  )

  //for full days
  const disabledDates = approvedLeaves?.filter((d) => !d?.halfDay)
  const fullDaysDisabled = disabledDates?.reduce((prev, curr) => {
    curr?.leaveDates?.forEach((date: string) => {
      let splitDate = date?.split('T')?.[0]
      prev[splitDate] = {
        disabled: true,
        disableType: curr?.leaveStatus === 'approved' ? 'Leave' : 'Pending',
      }
    })
    return prev
  }, {})

  const halfDisabledDates = approvedLeaves?.filter((d) => d?.halfDay)
  const halfDaysDisabled = halfDisabledDates?.reduce((prev, curr) => {
    const dateLeave = curr?.leaveDates?.[0]?.split('T')?.[0]
    if (Object.keys(prev || {}).includes(dateLeave)) {
      prev[dateLeave] = {
        disabled: true,
        disableType: curr?.leaveStatus === 'approved' ? 'Leave' : 'Pending',
      }
    } else {
      return
    }

    return prev
  }, {})

  const totalDisabledDates = {
    ...fullDaysDisabled,
    ...halfDaysDisabled,
  }

  return totalDisabledDates
}

export const isLeavesBeforeToday = (leaveDates: any) => {
  let firstDayofLeave
  if (leaveDates.length === 1) {
    firstDayofLeave = new Date(leaveDates[0]).setUTCHours(0, 0, 0, 0)
  } else {
    const ascSortedDate = leaveDates.sort(
      (date1: any, date2: any) => new Date(date1) - new Date(date2)
    )
    firstDayofLeave = new Date(ascSortedDate[0])?.setUTCHours(0, 0, 0, 0)
  }
  const todayDate = new Date()
  todayDate.setUTCHours(0, 0, 0, 0)

  return new Date(todayDate) < new Date(firstDayofLeave)
}

//attendance monthly dates
export const getAPIDateFormat = (year: any, month: number) => {
  let fromDate = `${year}-${`${month}`?.length > 1 ? month : `0${month}`}-01T00:00:00Z`
  let toDate = `${year}-${`${month}`?.length > 1 ? month : `0${month}`}-${moment(`${year}-${month}`)
    .endOf('month')
    .format('DD')}T00:00:00Z`

  return { fromDate, toDate }
}

export const sortTableDatas = (order?: string, column?: any, field?: string) => {
  return order === undefined || column === undefined
    ? '-logDate,-createdAt'
    : order === 'ascend'
    ? field === 'logDate'
      ? `${field},createdAt`
      : field
    : field === 'logDate'
    ? `-${field},-createdAt`
    : `-${field}`
}
//handle response after api call
export const handleResponse = (response: any, queries: any) => {
  if (response.status) {
    queries.forEach((query: any) => {
      query()
    })
  } else {
    queries[queries.length - 1]()
  }
}

export function removeDash(param: any) {
  return param
    .split('-')
    .map((item: any) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ')
}

export const leaveTypeData = (arrData: any[], leaveType: string) => {
  const casualLeavesOnly = arrData?.filter((leave: any) => leave?.leaveType?.name === leaveType)
  return casualLeavesOnly && getleaveDataFormater(casualLeavesOnly)
}

// Function to add the appropriate suffix to the day
export function getDayWithSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return `th`
  }
  switch (day % 10) {
    case 1:
      return `st`
    case 2:
      return `nd`
    case 3:
      return `rd`
    default:
      return `th`
  }
}

export const noticeDateFormat = ({
  date,
  isNotification = false,
  isSuperScript = false,
}: {
  date: string
  isNotification?: boolean
  isSuperScript?: boolean
}) => {
  // Convert UTC date time string to a JavaScript Date object
  const utcDateTime = new Date(date)
  const time = utcDateTime.toLocaleTimeString()
  const day = FullDaysConstant[utcDateTime.getDay()]
  const month = FULL_MONTH_NAME[utcDateTime.getMonth()]
  const monthDate = utcDateTime.getDate()
  const superScript = getDayWithSuffix(utcDateTime.getDate())
  const year = utcDateTime.getFullYear()

  const notificationDate = `${day}, ${month} ${monthDate}${superScript} ${year}, ${time}`
  const noticeBoardDate = `${monthDate}${superScript} ${month}, ${year}, ${day}`

  if (isSuperScript) {
    return {
      day,
      month,
      superScript,
      year,
      monthDate,
      time,
    }
  }
  return isNotification ? notificationDate : noticeBoardDate
}

//sort array of objects with date property

export const sortFromDate = (array: any[]) => {
  return array.sort((a, b) => new Date(a?.date) - new Date(b?.date))
}

export const debounce = (func, delay = 2000) => {
  let timer
  return function () {
    let self = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(self, args)
    }, delay)
  }
}

export const uriToBlob = (uri: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })
}

export const commonToast = ({
  toast,
  message,
  type,
  styles,
}: {
  toast: any
  message: string
  type: 'normal' | 'success' | 'warning' | 'danger' | 'custom'
  styles?: any
}) => {
  toast.hideAll()
  toast.show(message, {
    type,
    style: styles,
  })
}

export const extendDates = (data) => {
  let arrData = [],
    currDate = data?.startDate

  let isSame = data?.startDate?.split('T')?.[0] === data?.endDate?.split('T')?.[0]
  if (isSame) {
    return {
      _id: data?._id,
      details: data?.details,
      endDate: data?.endDate,
      type: data?.noticeType?.name,
      date: data?.startDate,
      title: data?.title,
      image: data?.image?.url,
    }
  }
  while (new Date(currDate) <= new Date(data?.endDate)) {
    let newDate = new Date(currDate).toISOString()
    arrData.push({
      _id: data?._id + newDate,
      details: data?.details,
      endDate: data?.endDate,
      type: data?.noticeType?.name,
      title: data?.title,
      image: data?.image?.url,
      date: newDate,
    })
    let newCurr = new Date(currDate)
    newCurr.setDate(newCurr.getDate() + 1)
    currDate = newCurr.toISOString()
  }
  return arrData
}
