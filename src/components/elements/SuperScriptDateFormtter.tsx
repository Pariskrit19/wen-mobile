import React from 'react'
import { View } from 'react-native'
import MyText from './MyText'
import { noticeDateFormat } from 'helpers/utils'
import { useTheme } from '@react-navigation/native'
import { FONT_CONST } from 'helpers/constants'

type Props = {
  date: string
  fontSize?: number
  style?: any
}

const SuperScriptDateFormtter = ({ date, fontSize = 11, style }: Props) => {
  const { colors } = useTheme()
  const { day, month, superScript, year, monthDate, time } = noticeDateFormat({
    date,
    isSuperScript: true,
  })
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: -2,
        ...style,
      }}
    >
      <MyText
        style={{ fontSize, lineHeight: 13, color: colors.descriptionFont }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikRegular}
      >
        {' '}
        {monthDate}
      </MyText>
      <MyText
        style={{
          fontSize: fontSize - 3,
          lineHeight: fontSize - 3,
          color: colors.descriptionFont,
          marginLeft: -2,
        }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikRegular}
      >
        {' '}
        {superScript}
      </MyText>
      <MyText
        style={{ fontSize, lineHeight: 13, color: colors.descriptionFont }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikRegular}
      >
        {' '}
        {month}, {year}, {day}
      </MyText>
    </View>
  )
}

export default SuperScriptDateFormtter
