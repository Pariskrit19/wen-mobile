import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MyText from './MyText'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'

type Props = {
  title: string
  value: string
  numOfLines?: boolean
}

const DetailsElement = ({ title, value, numOfLines = false }: Props) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <MyText
        style={{ ...styles.title, color: colors.subHeaderFont }}
        fontStyle={FONT_CONST.rubikMedium}
        hasCustomColor
      >
        {title}
      </MyText>
      <MyText
        style={{ ...styles.field, color: colors.descriptionFont }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikRegular}
        numberOfLines={numOfLines ? 1 : 0}
      >
        {value ?? '_ _'}
      </MyText>
    </View>
  )
}

export default DetailsElement

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 16,
    marginLeft: 20,
    marginRight: 26,
  },
  title: {
    width: '40%',
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    lineHeight: 35,
  },
  field: {
    fontWeight: '400',
    width: '60%',
    fontSize: 14,
    color: '#424243',
    lineHeight: 35,
  },
})
