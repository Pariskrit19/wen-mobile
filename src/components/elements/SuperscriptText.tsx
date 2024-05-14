import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from './MyText'

const SuperscriptText = ({ children, style }: { children: string; style?: any }) => {
  return <MyText style={{ ...styles.main, ...style }}>{children}</MyText>
}

export default SuperscriptText

const styles = StyleSheet.create({
  main: {
    fontSize: 10,
    textAlignVertical: 'top',
    color: 'white',
  },
})
