import { StyleSheet, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import MyText from './MyText'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'

type LiveTimeProps = {
  format?: string
  timeStyles?: Object
}

const LiveTime = ({ format = 'h:mm:ss A', timeStyles }: LiveTimeProps) => {
  const { colors } = useTheme()
  const [time, setTime] = useState<string>(moment().format(format))

  useEffect(() => {
    const realTIme = setInterval(() => {
      setTime(moment().format(format))
    }, 1000)
    return () => clearInterval(realTIme)
  }, [])
  return (
    <MyText
      style={{ ...styles.time, color: colors.calendarLiveTime, ...timeStyles }}
      hasCustomColor
      fontStyle={FONT_CONST.bold}
    >
      {time}
    </MyText>
  )
}

export default LiveTime

const styles = StyleSheet.create({
  time: {
    fontSize: 14,
  },
})
