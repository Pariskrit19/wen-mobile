import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const SpecialButton = ({
  children,
  customStyles,
  onPress,
  isSubmitting,
}: {
  children: React.ReactNode
  customStyles?: any
  onPress?: () => void
  isSubmitting: boolean
}) => {
  return (
    <Pressable
      style={[styles.pressable, customStyles, { opacity: isSubmitting ? 0.7 : 1 }]}
      onPress={onPress}
      disabled={isSubmitting}
    >
      {children}
    </Pressable>
  )
}

export default SpecialButton

const styles = StyleSheet.create({
  pressed: {},
  pressable: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#05A9C5',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },
})
