import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from './MyText'
import SuperscriptText from './SuperscriptText'
import { getUpcomingActivitiesDateFormate } from 'utils'
import { noticeDateFormat } from 'helpers/utils'

const FullDate = ({
  data,
  fontStyle,
  fontSize,
  color,
  isShort = false,
}: {
  data: Date | string
  fontStyle?: string
  fontSize?: number
  color?: string
  isShort?: boolean
}) => {
  const [date, superscript, month, day] = getUpcomingActivitiesDateFormate(data)
  const { month: fullMonth, year } = noticeDateFormat({ date: data, isSuperScript: true })

  return (
    <View style={styles.main}>
      <MyText
        hasCustomColor
        fontStyle={fontStyle}
        style={{ ...styles.field, color: color, fontSize }}
      >
        {date}
      </MyText>
      <SuperscriptText style={{ color: color, fontSize: fontSize ? fontSize - 4 : 11 }}>
        {superscript}
      </SuperscriptText>
      <MyText
        hasCustomColor
        style={{ ...styles.field, color: color, fontSize }}
        fontStyle={fontStyle}
      >
        {' '}
        {fullMonth}
      </MyText>
      <MyText
        hasCustomColor
        style={{ ...styles.field, color: color, fontSize }}
        fontStyle={fontStyle}
      >
        {isShort ? '' : `, ${year}`}
      </MyText>

      <MyText
        hasCustomColor
        style={{ ...styles.field, color: color, fontSize }}
        fontStyle={fontStyle}
      >
        , {day}
      </MyText>
    </View>
  )
}

export default FullDate

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  field: {
    paddingRight: 1,
    fontSize: 14,
    color: '#424243',
    alignSelf: 'flex-start',
  },
})
