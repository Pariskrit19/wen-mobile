import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { borderColor } from 'styles/colors'
import {
  checkboxActiveSize,
  checkboxBorderRadius,
  checkboxBorderWidth,
  checkboxSize,
} from 'styles/variables'
import Icon from './Icon'
import { color } from 'react-native-reanimated'
import { useTheme } from '@react-navigation/native'

interface IProps {
  checked?: boolean
  onPress?: Function
  size?: number
  backgroundColor?: string
  disabled?: boolean
}

const defaultProps = {
  onPress: () => {},
  checked: false,
  size: checkboxSize,
  disabled: false,
}
export const CheckBoxButton = (props: IProps & typeof defaultProps) => {
  const { checked, onPress, size, backgroundColor, disabled } = props
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.checkBoxContainer,
        {
          height: size || checkboxSize,
          width: size || checkboxSize,
          backgroundColor: checked ? '#05A9C5' : colors.secondBackground,
          borderColor: borderColor,
          borderWidth: 2,
        },
      ]}
      onPress={onPress}
    >
      {checked ? (
        <Icon
          name="check-fill"
          isFill
          fill="white"
          width={12}
          height={12}
          stroke="white"
          isStroke
          containerStyles={{ alignItems: 'center', justifyContent: 'center' }}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  )
}
CheckBoxButton.defaultProps = defaultProps
const styles = StyleSheet.create({
  activeIcon: {
    width: checkboxActiveSize,
    height: checkboxActiveSize,
    tintColor: '#fffff',
  },
  checkBoxContainer: {
    borderRadius: checkboxBorderRadius,
    borderWidth: checkboxBorderWidth,
    justifyContent: 'center',
  },
})
