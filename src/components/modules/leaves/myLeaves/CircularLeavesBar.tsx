import React from 'react'
import { StyleSheet, View } from 'react-native'
import MyText from 'components/elements/MyText'
import CircularBar from 'components/elements/circularBar/CircularBar'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'

type Props = {
  color: string
  fill: number
  daysLabel: string
  barText: string
}

const CircularLeavesBar = ({ color, daysLabel, fill = 75, barText }: Props) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
        <CircularBar
          width={3}
          size={50}
          backgroundColor="#D9D9D9"
          fill={fill}
          color={color}
          barText={barText}
        />
      </View>
      <View style={styles.textContainer}>
        <MyText
          style={{ ...styles.leaveText, color: colors.detailField }}
          hasCustomColor
          fontStyle={FONT_CONST.rubikRegular}
        >
          {daysLabel}
        </MyText>
      </View>
    </View>
  )
}

export default CircularLeavesBar

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginBottom: 20,
    alignItems: 'center',
    width: '33%',
  },

  leaveText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#424243',
  },
  textContainer: {
    marginTop: 8,
  },
})
