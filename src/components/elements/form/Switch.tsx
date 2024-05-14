import * as React from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import { borderColor, primaryColor } from 'styles/colors'
import MyText from '../MyText'

interface ISwitchProps {
  value?: boolean
  onChange?: Function
  trackColor?: string
  thumbColor?: string
  trackEnableColor?: string
  thumbEnableColor?: string
  label?: string
}

const defaultProps = {
  value: false,
  onChange: () => {},
  trackColor: '#767577',
  thumbColor: borderColor,
  trackEnableColor: primaryColor,
  thumbEnableColor: '#f4f3f4',
  label: '',
}
const SwitchEl: React.FunctionComponent<ISwitchProps> = (props) => {
  const { value, onChange, label, trackColor, thumbColor, trackEnableColor, thumbEnableColor } =
    props
  return (
    <View style={{ ...switchStyles.switchContainer }}>
      {label && (
        <MyText style={{ ...switchStyles.label }} fontStyle="medium">
          {label}
        </MyText>
      )}
      <Switch
        trackColor={{ false: trackColor, true: trackEnableColor }}
        thumbColor={value ? thumbEnableColor : thumbColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => onChange && onChange(!value)}
        value={value}
      />
    </View>
  )
}

SwitchEl.defaultProps = defaultProps
const switchStyles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: { color: '#000' },
})
export default SwitchEl
