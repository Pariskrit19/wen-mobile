import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from './MyText'
import { getAbbreviatedName } from 'utils'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'

interface AvatarProps {
  name: string
  imageStyles: object
  image?: string
  isDashboard?: boolean
}

const Avatar = ({ imageStyles, image, name, isDashboard = false }: AvatarProps) => {
  const { colors } = useTheme()
  return image ? (
    <Image source={{ uri: image }} style={imageStyles} />
  ) : (
    <MyText
      fontStyle={FONT_CONST.rubikRegular}
      style={{
        fontSize: isDashboard ? 14 : 18,
        color: colors.descriptionFont,
      }}
      hasCustomColor={true}
    >
      {getAbbreviatedName(name)}
    </MyText>
  )
}

export default Avatar

const styles = StyleSheet.create({})
