import React from 'react'
import { StyleSheet, View } from 'react-native'
import MyText from '../MyText'
import { FONT_CONST } from 'helpers/constants'

const NormalHeader = ({ month }: { month: string }) => {
  return (
    <View style={styles.root}>
      <MyText style={styles.date} fontStyle={FONT_CONST.bold}>
        {month}
      </MyText>
    </View>
  )
}

export default NormalHeader

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  date: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
})
