import { useTheme } from '@react-navigation/native'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  item: any
  singleDate?: boolean
}

const AttendanceWeekend = ({ item, singleDate = false }: Props) => {
  const { colors } = useTheme()
  const monthDay = +item?.date?.split('-')?.[2]
  return (
    <View
      style={{
        ...styles.weekendContainer,
        backgroundColor: colors.attendanceWeekend,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Icon
        name={'holidayDashboardIcon'}
        width={15}
        height={15}
        isFill
        fill={colors.attendanceWeekendText}
        containerStyles={{ marginRight: 10 }}
      />
      <MyText
        style={{ ...styles.weekendDate, color: colors.attendanceWeekendText }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikMedium}
      >
        {singleDate
          ? `WEEKEND: ${+monthDay} ${item?.day}`
          : `WEEKEND: ${monthDay} ${item?.day} & ${+monthDay + 1} SUNDAY`}
      </MyText>
    </View>
  )
}

export default AttendanceWeekend

const styles = StyleSheet.create({
  weekendContainer: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 36,
    borderRadius: 5,
    marginTop: 15,
    //  minHeight: 66,
  },
  weekendDate: {
    fontSize: 10,
    lineHeight: 10,
    alignSelf: 'center',
  },
})
