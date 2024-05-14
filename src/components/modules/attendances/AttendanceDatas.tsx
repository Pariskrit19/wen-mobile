import MyText from 'components/elements/MyText'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { calendarWeedkendColor } from 'styles/colors'
import { useTheme } from '@react-navigation/native'
import Icon from 'components/elements/Icon'
import { DaysConstant } from 'helpers/constants'
import moment from 'moment'
import { milliSecondIntoHours } from 'helpers/utils'
import AttendanceCalendarDate from './AttendanceCalendarDate'
import { MuiFormatDate } from 'utils'

type Props = {
  date?: string
  officeHours?: number
  punchInTime?: string
  punchOutTime?: string
  id: string
  isLeave?: boolean
  isMultiple?: boolean
}

type multiProps = Props & {
  sub: Props[]
}

const AttendanceData = ({
  item,
  multiData,
  handleDetailMulti,
}: {
  item: Props
  multiData: multiProps
  handleDetailMulti: any
}) => {
  const { colors } = useTheme()
  const dayString = DaysConstant[moment(item?.date)?.day()]
  const isFullTime =
    item?.officeHours &&
    moment(moment('2022-11-13T12:15:00Z').format('HH:mm:ss'), 'HH:mm:ss').diff(
      moment(moment('2022-11-11T03:15:00Z').format('HH:mm:ss'), 'HH:mm:ss')
    ) <= item?.officeHours

  return (
    <View style={styles.normalAttendanceContainer}>
      <View style={styles.normalAttendances}>
        <AttendanceCalendarDate
          day={DaysConstant[moment(item?.date)?.day()]}
          date={item?.date?.split('-')[2]}
          isToday={item?.date === MuiFormatDate()}
          isWeekend={dayString === 'Sun' || dayString === 'Sat'}
        />
      </View>
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
  )
}

export default AttendanceData

const styles = StyleSheet.create({
  normalAttendanceContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
  },
  normalAttendances: {
    width: '21%',
    alignSelf: 'center',
  },
  elevate: {
    elevation: 5,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    width: '60%',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
  },
  normalDatas: {
    width: '25%',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    lineHeight: 15,
    color: '#606060',
  },
  dateDate: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  officeHourContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '31%',
  },
  pressableStyle: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
})
