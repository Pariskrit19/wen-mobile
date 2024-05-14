import React from 'react'
import { StyleSheet, View } from 'react-native'
import MyText from 'components/elements/MyText'
import CircularBar from 'components/elements/circularBar/CircularBar'
import { FONT_CONST } from 'helpers/constants'

type Props = {
  color: string
  fill: number
  daysText: string
  daysLabel: string
}

const LeaveCircularBar = ({ color, daysText, daysLabel, fill = 75 }: Props) => {
  return (
    <View style={styles.container}>
      <CircularBar
        hasIcon
        width={3}
        size={50}
        backgroundColor="#D9D9D9"
        fill={fill}
        color={color}
      />
      <View style={styles.textContainer}>
        <MyText style={styles.daysText} fontStyle={FONT_CONST.rubikMedium}>
          {daysText}
        </MyText>
        <MyText style={styles.leaveText} fontStyle={FONT_CONST.rubikRegular}>
          {daysLabel}
        </MyText>
      </View>
    </View>
  )
}

export default LeaveCircularBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    marginHorizontal: 10,
  },
  daysText: {
    color: 'black',
    fontSize: 16,
    lineHeight: 16,
  },
  leaveText: {
    fontSize: 12,
    lineHeight: 15,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
})
