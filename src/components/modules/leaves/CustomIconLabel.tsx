import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import MyText from '../../elements/MyText'
import { useTheme } from '@react-navigation/native'

type IconType = {
  color?: string
  label: String
  focused?: boolean
}

const CustomIconLabel = ({ focused, color, label }: IconType) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      {color && (
        <View
          style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color, marginRight: 5 }}
        ></View>
      )}
      <MyText
        style={{ ...styles.text, color: focused ? colors.calendarMonthText : '#606060' }}
        fontStyle="extraBold"
      >
        {label}
      </MyText>
    </View>
  )
}

export default CustomIconLabel

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#606060',
    fontSize: 16,
  },
  icons: {
    alignSelf: 'center',
  },
})
