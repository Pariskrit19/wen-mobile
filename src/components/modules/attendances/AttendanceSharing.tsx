import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import AttendanceCalendarDate from './AttendanceCalendarDate'
import { DaysConstant } from 'helpers/constants'
import moment from 'moment'
import { MuiFormatDate } from 'utils'
import MyText from 'components/elements/MyText'
import { useTheme } from '@react-navigation/native'
import { milliSecondIntoHours } from 'helpers/utils'
import Icon from 'components/elements/Icon'
import { calendarWeedkendColor } from 'styles/colors'

const AttendanceSharing = ({ item, multiData, handleDetailMulti }: any) => {
  const { colors } = useTheme()
  const dayString = DaysConstant[moment(item?.date)?.day()]
  const isFullTime =
    item?.officeHours &&
    moment(moment('2022-11-13T12:15:00Z').format('HH:mm:ss'), 'HH:mm:ss').diff(
      moment(moment('2022-11-11T03:15:00Z').format('HH:mm:ss'), 'HH:mm:ss')
    ) <= item?.officeHours
  const halfLeave =
    item?.halfDay === 'first-half' ? ' (1st)' : item?.halfDay === 'second-half' ? ' (2nd)' : ''
  return (
    <View style={styles.normalAttendanceContainer}>
      <View style={styles.leaveChildContainer}>
        <AttendanceCalendarDate
          day={dayString}
          date={item?.date?.split('-')[2]}
          isToday={item?.date === MuiFormatDate()}
          isWeekend={dayString === 'Sun' || dayString === 'Sat'}
        />
      </View>
      {item?.isLeave && (
        <MyText
          style={{ ...styles.dateDay, color: item?.isLeave ? '#fd7e14' : '#c16262', marginTop: 5 }}
          hasCustomColor
          fontStyle="rubikMedium"
        >
          {item?.leaveName} {halfLeave}
        </MyText>
      )}
      {item?.isHoliday && (
        <MyText
          style={{ ...styles.dateDay, color: item?.isLeave ? '#fd7e14' : '#c16262' }}
          hasCustomColor
          fontStyle="rubikMedium"
        >
          {item?.holidayName}
        </MyText>
      )}

      {item.hasOwnProperty('officeHours') && (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 'auto',
          }}
        >
          <MyText
            style={{ ...styles.normalDatas, color: colors.descriptionFont }}
            hasCustomColor
            fontStyle="rubikMedium"
          >
            {item?.punchInTime || '--:--:--'}
          </MyText>
          <MyText
            style={{ ...styles.normalDatas, color: colors.descriptionFont }}
            hasCustomColor
            fontStyle="rubikMedium"
          >
            {item?.punchOutTime || '--:--:--'}
          </MyText>

          <View style={styles.officeHourContainer}>
            <MyText
              style={{
                ...styles.normalDatas,
                flex: 0.9,
                color: isFullTime ? colors.totalWorkingHours : calendarWeedkendColor,
              }}
              hasCustomColor
              fontStyle="rubikMedium"
            >
              {(item?.officeHours && milliSecondIntoHours(item?.officeHours)) || '--'}
            </MyText>
            <Pressable onPress={() => handleDetailMulti(item)} style={styles.pressableStyle}>
              {(multiData?.id || item?.id) && (
                <Icon
                  name="KeyboardRightArrow"
                  width={8}
                  height={30}
                  isFill
                  fill={colors.iconColor}
                  containerStyles={{
                    transform: multiData?.id === item.id ? 'rotate(90deg)' : 'rotate(0deg)',
                    paddingHorizontal: 7.5,
                  }}
                />
              )}
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

export default AttendanceSharing

const styles = StyleSheet.create({
  normalAttendanceContainer: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: 15,
  },
  leaveChildContainer: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
  },
  normalDatas: {
    width: '25%',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    lineHeight: 15,
    color: '#606060',
  },

  officeHourContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '29%',
  },
  pressableStyle: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 15,
    alignSelf: 'center',
    position: 'relative',
    width: '65%',
    marginBottom: 5,
  },
})
