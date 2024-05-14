import { useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'

type Props = {
  date?: string
  day: string
  isToday?: boolean
  isWeekend?: boolean
  selectedDate?: number
}

const AttendanceCalendarDate = ({
  date,
  day,
  isToday = false,
  isWeekend = false,
  selectedDate,
}: Props) => {
  const { colors } = useTheme()
  const [blinkAnimation] = useState(new Animated.Value(0))
  let interval: any = null
  const activeDate = String(selectedDate).length === 1 ? '0' + selectedDate : String(selectedDate)
  useEffect(() => {
    if (date === activeDate) {
      let count = 0
      interval = setInterval(() => {
        Animated.sequence([
          Animated.timing(blinkAnimation, {
            toValue: 1,
            duration: 400, // Fade in duration
            useNativeDriver: false,
          }),
          Animated.timing(blinkAnimation, {
            toValue: 0,
            duration: 400, // Fade out duration
            useNativeDriver: false,
          }),
        ]).start(() => {
          count++
          if (count === 4) {
            clearInterval(interval)
          }
        })
      }, 1000) // Interval between each blink
    }

    return () => clearInterval(interval)
  }, [])

  const backgroundColorInterpolation = blinkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.calendarDateBackground, 'black'], // Change colors as per your requirement
  })

  return (
    <Animated.View
      style={[
        styles.elevate,
        {
          backgroundColor: isToday
            ? '#6AAEE8'
            : isWeekend
            ? '#c16262'
            : backgroundColorInterpolation,
        },
      ]}
    >
      <MyText
        style={{ ...styles.dateDate, color: colors.headerFont }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikMedium}
      >
        {date}
      </MyText>
      <MyText
        style={{
          ...styles.dateDate,
          ...styles.dayDateStyle,
          color: isToday || isWeekend ? colors.detailFieldSpecial : colors.detailField,
          textTransform: 'uppercase',
        }}
        fontStyle={FONT_CONST.rubikMedium}
        hasCustomColor
      >
        {day}
      </MyText>
    </Animated.View>
  )
}

export default AttendanceCalendarDate

const styles = StyleSheet.create({
  dateDate: {
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    lineHeight: 21,
  },
  elevate: {
    elevation: 5,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    width: 46,
    height: 46,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
  },
  dayDateStyle: {
    fontSize: 10,
    lineHeight: 11,
    fontWeight: '500',
  },
})
