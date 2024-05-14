import { useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { FullDaysConstant, FONT_CONST, months } from 'helpers/constants'
import moment from 'moment'
import React from 'react'
import { View } from 'react-native'

const MonthDaysDate = () => {
  const days = moment().day()
  const dayName = FullDaysConstant[days]
  const todaysDate = moment().month()
  const monthName = months.find((d) => d.id === todaysDate + 1)?.name
  const date = moment().date()
  const { colors } = useTheme()
  return (
    <View>
      <MyText
        style={{ fontSize: 18, color: colors.descriptionFont, alignSelf: 'center' }}
        fontStyle={FONT_CONST.rubikRegular}
        hasCustomColor
      >
        {dayName}, {monthName} {date}
      </MyText>
    </View>
  )
}

export default MonthDaysDate
