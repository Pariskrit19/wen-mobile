import * as React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { commonStyles } from 'styles/common'
import { flexStyles } from 'styles/flex'
import { checkboxSize } from 'styles/variables'
import { isEmpty } from 'utils'
import MyText from 'components/elements/MyText'

import { CheckBoxButton } from '../CheckBoxButton'
interface ICheckboxProps {
  checked?: boolean
  onPress?: Function & (() => void)
  label?: string
  styles?: Object
  size?: number
  disabled?: boolean
}
const defaultProps = {
  onPress: () => {},
  size: checkboxSize,
  label: '',
  styles: {},
  checked: false,
  disabled: false,
}
const CheckboxEl: React.FunctionComponent<ICheckboxProps> = (props) => {
  const { checked, onPress, label, styles, size, disabled } = props
  return (
    <View
      style={{
        ...flexStyles.flex,
        ...styles,
        ...flexStyles.flexDirectionRow,
        justifyContent: 'flex-start',
      }}
    >
      <CheckBoxButton checked={checked} onPress={onPress} size={size} disabled={disabled} />
      {!isEmpty(label) && (
        <MyText style={checkboxStyles.label} fontStyle={'bold'}>
          {label || ''}
        </MyText>
      )}
    </View>
  )
}
CheckboxEl.defaultProps = defaultProps

const checkboxStyles = StyleSheet.create({
  label: {
    marginLeft: 10,
    fontSize: 15,
    color: 'rgba(30, 30, 30, 0.6)',
  },
})
export default CheckboxEl
