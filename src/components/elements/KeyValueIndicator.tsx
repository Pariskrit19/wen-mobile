import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from './MyText'

type Props = {
  type: string
  description: string
}

const KeyValueIndicator = ({ type, description }: Props) => {
  return (
    <View style={styles.main}>
      <View style={{ flex: 1 }}>
        <MyText style={styles.type}>{type}:</MyText>
      </View>
      <View style={{ flex: 1 }}>
        <MyText style={styles.description}>{description}</MyText>
      </View>
    </View>
  )
}

export default KeyValueIndicator

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    paddingLeft: 12,
    marginVertical: 10,
  },
  type: {
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    color: '#424243',
  },
})
