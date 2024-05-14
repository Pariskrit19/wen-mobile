import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/AntDesign'

interface IconProps {
  name: any
  color: any
  size: number
  containerStyle?: any
}

const IconButton = ({ name, color, size, containerStyle }: IconProps) => {
  return (
    <View style={[styles.root, containerStyle]}>
      <Ionicons name={name} color={color} size={size} />
    </View>
  )
}

export default IconButton

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
