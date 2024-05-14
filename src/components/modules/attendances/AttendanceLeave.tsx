import MyText from 'components/elements/MyText'
import { DaysConstant } from 'helpers/constants'
import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import AttendanceCalendarDate from './AttendanceCalendarDate'
import { MuiFormatDate } from 'utils'

type Props = {
  date?: string
  OfficeHour?: string
  PunchIn?: string
  PunchOut?: string
  id: string
  isLeave?: boolean
  name?: string
}

const AttendanceLeaveHoliday = ({ item }: { item: Props }) => {
  const halfLeave =
    item?.halfDay === 'first-half' ? ' (1st)' : item?.halfDay === 'second-half' ? ' (2nd)' : ''
  const dayString = DaysConstant[moment(item?.date)?.day()]
  return (
    <View style={styles.leaveContainer}>
      <View style={styles.leaveChildContainer}>
        <AttendanceCalendarDate
          day={DaysConstant[moment(item?.date)?.day()]}
          date={item?.date?.split('-')?.[2]}
          isToday={item?.date === MuiFormatDate()}
          isWeekend={dayString === 'Sun' || dayString === 'Sat'}
        />
      </View>
      <MyText
        style={{ ...styles.dateDay, color: item?.isLeave ? '#fd7e14' : '#c16262' }}
        hasCustomColor
        fontStyle="rubikMedium"
      >
        {item?.name} {halfLeave}
      </MyText>
    </View>
  )
}

export default AttendanceLeaveHoliday

const styles = StyleSheet.create({
  leaveContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  leaveChildContainer: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    left: 0,
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 15,
    alignSelf: 'center',
    position: 'relative',
    width: '65%',
  },
})
