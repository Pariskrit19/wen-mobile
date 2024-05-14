import MyText from 'components/elements/MyText'
import { Colors } from 'constants/colors'
import * as React from 'react'
import { ActivityIndicator, Animated, Pressable, StyleSheet, View } from 'react-native'
import { btnBorderRadius, btnHeight, btnWidth, defaultFontSize } from 'styles/variables'
import { fontWeightType } from 'ts/types'

export interface ButtonProps {
  title?: string
  onPress: Function
  color?: string
  styles?: Object
  btnTextColor?: string
  btnWidth?: any
  btnHeight?: number
  hasIcon?: boolean
  icon?: React.ReactElement
  loading?: boolean
  disabled?: boolean
  iconToLeft?: boolean
  btnTextBold?: boolean
  fontSize?: number
  fontWeight?: fontWeightType
  backgroundColor?: string
  hasPressedEffect?: boolean
  scaleX?: any
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through' | undefined
  isAnimated?: boolean
}
const defaultProps = {
  color: '#ffffff',
  styles: {},
  btnTextColor: '#001052',
  btnWidth: btnWidth,
  btnHeight: btnHeight,
  hasIcon: false,
  icon: null,
  loading: false,
  disabled: false,
  iconToLeft: false,
  btnTextBold: true,
  fontSize: 14,
  fontWeight: '600',
  backgroundColor: Colors.wenBlue,
  textDecorationLine: 'none',
  hasPressedEffect: false,
  isAnimated: false,
}
function ButtonEl(props: ButtonProps) {
  const {
    title,
    color,
    styles,
    onPress,
    btnTextColor,
    btnWidth,
    hasIcon,
    icon,
    loading,
    btnHeight,
    disabled,
    iconToLeft,
    btnTextBold,
    fontSize,
    fontWeight,
    backgroundColor,
    textDecorationLine,
    hasPressedEffect,
    isAnimated,
  } = props

  const animatedButtonScale = new Animated.Value(1)

  const onPressIn = () => {
    Animated.spring(animatedButtonScale, { toValue: 0.9, useNativeDriver: true }).start()
  }

  const onPressOut = () => {
    Animated.spring(animatedButtonScale, { toValue: 1, useNativeDriver: true }).start()
  }

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  }
  return (
    <Animated.View
      style={{
        backgroundColor: backgroundColor,
        ...btnStyles.style,

        ...styles,
        opacity: disabled ? 0.7 : 1,
        width: btnWidth,
        ...animatedScaleStyle,
      }}
    >
      <Pressable
        style={{
          ...btnStyles.button,
          height: btnHeight,
          width: '100%',
        }}
        onPress={() => onPress()}
        onPressIn={hasPressedEffect ? onPressIn : null}
        onPressOut={hasPressedEffect ? onPressOut : null}
        disabled={disabled || loading}
      >
        {hasIcon && iconToLeft && !loading ? (
          <View style={btnStyles.iconContainer}>{icon}</View>
        ) : null}
        <MyText
          style={{
            ...btnStyles.text,
            color: btnTextColor,
            fontSize: fontSize,
            fontWeight: fontWeight,
            textDecorationLine: textDecorationLine,
            flex: iconToLeft && hasIcon && !isAnimated ? 0 : 1,
          }}
          fontStyle={btnTextBold ? 'bold' : 'regular'}
          btnText
        >
          {title}
        </MyText>
        {hasIcon && !iconToLeft && !loading ? (
          <View style={btnStyles.iconContainer}>{icon}</View>
        ) : null}
        {loading && <ActivityIndicator size="small" color={btnTextColor} />}
      </Pressable>
    </Animated.View>
  )
}
const btnStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 3,
  },
  style: {
    elevation: 1,
    borderRadius: btnBorderRadius,
  },
  text: {
    fontSize: defaultFontSize,
    lineHeight: 23,
    letterSpacing: 0.25,
    textAlign: 'center',
    marginVertical: 8,
  },
  iconContainer: {},
})
ButtonEl.defaultProps = defaultProps
export default ButtonEl
