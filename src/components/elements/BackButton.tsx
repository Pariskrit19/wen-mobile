import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp, useTheme } from '@react-navigation/native'
import Icon from './Icon'
import { useAppSelector } from 'redux/hook'

const BackButton = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const { darkMode } = useAppSelector((state) => state.appTheme)
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.pressable}>
      <Icon
        width="30"
        height="16"
        name="BackArrow"
        fill={darkMode ? '#fff' : '#1E1E1E'}
        isFill={true}
      />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  pressable: {
    padding: 0,
    marginLeft: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  pressed: {
    backgroundColor: '#f2eeed',
  },
})

// const dynamicStyles = (darkMode: boolean) =>
//   StyleSheet.create({
//     pressed: {
//       backgroundColor: darkMode ? '#ccc' : '#f2eeed',
//     },
//   })
