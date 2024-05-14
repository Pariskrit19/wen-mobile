import { useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  label: string
  value?: string
  style?: object
  labelStyle?: object
}

const ProjectLabelValue = ({ label, style, value, labelStyle }: Props) => {
  const { colors } = useTheme()
  return (
    <MyText style={style} numberOfLines={1}>
      <MyText
        style={{ ...styles.title, color: colors.projectListTitleField, ...labelStyle }}
        fontStyle={FONT_CONST.rubikMedium}
        hasCustomColor
      >
        {label}:
      </MyText>
      <MyText> </MyText>
      <MyText
        style={{ ...styles.value, color: colors.projectListValueField, ...labelStyle }}
        fontStyle={FONT_CONST.rubikRegular}
        hasCustomColor
        numberOfLines={1}
      >
        {value}
      </MyText>
    </MyText>
  )
}

export default ProjectLabelValue

const styles = StyleSheet.create({
  value: {
    marginLeft: 15,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400',
    alignSelf: 'center',
    color: 'rgba(96, 96, 96, 0.8)',
  },
  title: {
    color: '#424243',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
    marginRight: 10,
  },
})
