import moment from 'moment'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { MuiFormatDate } from 'utils'
import { AntDesign } from '@expo/vector-icons'
import { useAppSelector } from 'redux/hook'
import { useTheme } from '@react-navigation/native'
import Icon from 'components/elements/Icon'
import { calendarWeedkendColor } from 'styles/colors'
import { useToast } from 'react-native-toast-notifications'
import { commonToast } from 'helpers/utils'

type Props = {
  setDateSelected: (e: any) => void
  dateSelected?: Object
  disabledDates?: Object
}

const LeaveCalendar = ({ setDateSelected, dateSelected, disabledDates }: Props) => {
  const { colors } = useTheme()
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const toast = useToast()
  const [month, setMonth] = useState(moment())
  const [theme, setTheme] = useState(darkMode)

  const customMarks = (startDate: any, endDate: any) => {
    const markedWeekends: any = {}

    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)

    while (currentDate <= lastDate) {
      const date = currentDate.toISOString().split('T')[0]
      const dayOfWeek = currentDate.getDay()

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        markedWeekends[date] = {
          selected: true,
          selectedColor: colors.headerBackground,
          selectedTextColor: calendarWeedkendColor,
        }
      } else {
        markedWeekends[date] = {
          selected: true,
          selectedColor: colors.headerBackground,
          selectedTextColor: colors.descriptionFont,
        }
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return markedWeekends
  }

  const today = MuiFormatDate()
  const marked = {
    [today]: { selected: true, selectedColor: 'rgba(5, 169, 197, 0.6)' },
  }

  const handleMonth = (month: any) => {
    setMonth(month?.dateString)
  }

  const handleKeyPress = (e: any) => {
    if ([0, 6].includes(moment(e.dateString).day()))
      return commonToast({ toast: toast, message: 'Weekends are disabled.', type: 'warning' })

    if (disabledDates && disabledDates[e?.dateString]) {
      let toastMessage,
        disableType = disabledDates[e?.dateString]?.disableType
      if (disableType === 'Leave') {
        toastMessage = 'Leave already registered for the day'
      } else if (disableType === 'Holiday') {
        toastMessage = disabledDates[e?.dateString]?.holidayName
      } else {
        toastMessage = 'Leave request for the day is pending.'
      }
      return commonToast({ toast: toast, message: toastMessage, type: 'warning' })
    }
    setDateSelected((prev: any) => ({
      ...prev,
      [e.dateString]: {
        selected: true,
        endingDay: true,
        color: 'blue',
        textColor: colors.text,
      },
    }))
  }

  return (
    <View style={{ marginHorizontal: 3 }}>
      <Calendar
        key={theme}
        firstDay={1}
        enableSwipeMonths
        hideExtraDays
        // minDate={'2023-05-10'}
        style={{ marginTop: 15, borderRadius: 10 }}
        onDayPress={(e) => handleKeyPress(e)}
        // selected={'2023-05-29'}
        theme={{
          todayTextColor: '#50cebb',
          dotColor: 'red',
          selectedDotColor: 'red',
          textDisabledColor: colors.disabledDate,
          monthTextColor: 'red',
          // dayTextColor: colors.text,
          'stylesheet.calendar.header': {
            dayTextAtIndex0: {
              color: colors.descriptionFont,
              fontWeight: 'bold',
            },
            dayTextAtIndex1: {
              color: colors.descriptionFont,
              fontWeight: 'bold',
            },
            dayTextAtIndex2: {
              color: colors.descriptionFont,
              fontWeight: 'bold',
            },
            dayTextAtIndex3: {
              color: colors.descriptionFont,
              fontWeight: 'bold',
            },
            dayTextAtIndex4: {
              color: colors.descriptionFont,
              fontWeight: 'bold',
            },
            dayTextAtIndex5: {
              color: calendarWeedkendColor,
              fontWeight: 'bold',
            },
            dayTextAtIndex6: {
              color: calendarWeedkendColor,
              fontWeight: 'bold',
            },
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between',

              marginTop: 6,
              alignItems: 'center',
            },
            monthText: {
              fontSize: 15,
              fontWeight: '600',
              color: colors.headerFont,
            },
            color: 'red',
          },
          calendarBackground: colors.headerBackground,
        }}
        renderArrow={(direction) => (
          <Icon
            name="KeyboardRightArrow"
            fill="#0074d9"
            isFill
            width={10}
            containerStyles={{
              transform: direction === 'left' ? 'rotate(180deg)' : 'none',
            }}
          />
        )}
        onMonthChange={handleMonth}
        markedDates={{
          ...customMarks(
            moment(month).startOf('month').format('YYYY-MM-DD'),
            moment(month).endOf('month').format('YYYY-MM-DD')
          ),
          ...disabledDates,
          ...dateSelected,
          ...marked,
        }}
      />
    </View>
  )
}

export default LeaveCalendar
