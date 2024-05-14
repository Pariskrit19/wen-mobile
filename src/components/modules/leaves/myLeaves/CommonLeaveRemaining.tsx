import { Entypo } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  color: string
  leaveText: string
  days: number
  direction?: string
}

const CommonLeaveRemaining = ({ color, leaveText, days, direction = 'left' }: Props) => {
  const { colors } = useTheme()
  return (
    <View>
      <View style={styles.direction}>
        <View style={{ ...styles.circle, backgroundColor: color }}></View>
        <MyText
          style={{ ...styles.textStyle, color: colors.leaveTotalUsed }}
          hasCustomColor
          fontStyle={FONT_CONST.rubikRegular}
        >
          {leaveText}
        </MyText>
      </View>
      <View>
        <MyText
          style={{ ...styles.daysStyle, textAlign: direction, color: colors.leaveDaysTotalUsed }}
          fontStyle={FONT_CONST.rubikMedium}
          hasCustomColor
        >
          {days}
        </MyText>
      </View>
    </View>
  )
}

export default CommonLeaveRemaining

const styles = StyleSheet.create({
  direction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
  },
  textStyle: {
    textAlign: 'right',
    fontSize: 14,
    color: '#777777',
    lineHeight: 16.5,
  },
  daysStyle: {
    fontSize: 30,
    color: '#424243',
    marginTop: 0,
    lineHeight: 34,
    marginLeft: 13,
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    alignSelf: 'center',
    marginRight: 5,
  },
})
