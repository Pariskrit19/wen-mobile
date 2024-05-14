import { useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {}

const tableConst: string[] = ['Date', 'Punch In', 'Punch Out', 'Office Hours']

const AttendanceTitle = (props: Props) => {
  const { colors } = useTheme()
  return (
    <View style={{ ...styles.tableTitle, backgroundColor: colors.calendarTitle }}>
      {tableConst.map((title: string, index: number) => (
        <MyText
          key={title}
          style={{
            ...styles.tableText,
            color: colors.yearFilter,
            borderRightColor: colors.attendanceTitleBorder,
            width: title === 'Date' ? '21%' : title === 'Office Hours' ? '29%' : '25%',
            borderRightWidth: index === tableConst.length - 1 ? 0 : 1,
          }}
          hasCustomColor
          fontStyle={FONT_CONST.rubikMedium}
        >
          {title}
        </MyText>
      ))}
    </View>
  )
}

export default AttendanceTitle

const styles = StyleSheet.create({
  tableTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    marginTop: 20,
  },
  tableText: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '25%',
    fontSize: 10,
    padding: 10,
    fontWeight: '500',
    lineHeight: 10,
  },
})
