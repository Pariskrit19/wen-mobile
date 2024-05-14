import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MyText from '../MyText'
import LiveTime from '../LiveTime'
import { useTheme } from '@react-navigation/native'

const CustomDay = ({ day }: any) => {
  const shortenedDay = day.substring(0, 1)

  return <MyText>{shortenedDay}</MyText>
}

const CustomHeader = ({ month }: { month: string }) => {
  const { colors } = useTheme()
  return (
    <View style={styles.root}>
      <MyText style={{ ...styles.date, color: colors.headerFont }} hasCustomColor>
        {month}
      </MyText>
      <LiveTime />
    </View>
  )
}

export { CustomDay, CustomHeader }

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  date: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
