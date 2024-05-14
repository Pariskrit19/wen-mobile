import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import MyText from 'components/elements/MyText'
import Icon from '../Icon'
import { useTheme } from '@react-navigation/native'
import { FONT_CONST } from 'helpers/constants'

type Props = {
  color: string
  fill: number
  size?: number
  backgroundColor: string
  width?: number
  hasIcon?: boolean
  barText?: string
}

const CircularBar = ({
  color,
  fill,
  size = 50,
  width = 5,
  backgroundColor,
  hasIcon,
  barText,
}: Props) => {
  const { colors } = useTheme()
  return (
    <AnimatedCircularProgress
      rotation={0}
      size={size}
      width={width}
      duration={0}
      fill={fill}
      tintColor={color}
      backgroundColor={backgroundColor}
      style={{ backgroundColor: colors.secondBackground, borderRadius: 25 }}
    >
      {(props) =>
        hasIcon ? (
          <Icon name="Briefcase" width={24} height={24} fill={color} isFill />
        ) : (
          <View>
            <MyText
              style={{ ...styles.barText, color: colors.subHeaderFont }}
              fontStyle={FONT_CONST.rubikMedium}
              hasCustomColor
            >
              {barText}
            </MyText>
          </View>
        )
      }
    </AnimatedCircularProgress>
  )
}

export default CircularBar

const styles = StyleSheet.create({
  barText: {
    fontSize: 16,
  },
})
