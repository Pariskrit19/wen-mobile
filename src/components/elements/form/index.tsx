import MyText from 'components/elements/MyText'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { errorColor, textColor } from 'styles/colors'
import { formElContainerPadding, infoFontSize, infoMarginTop } from 'styles/variables'
import { wholeFormInterface } from 'ts/interfaces/formInterface'
import CheckboxEl from './Checkbox'
import DatePicker from './DatePicker'
import Dropdown from './Dropdown'
import TextInputEl from './TextInput'
import Switch from './Switch'

const defaultProps = {
  formName: 'textinput',
  paddingHorizontal: 0,
}
const Form = (props: wholeFormInterface) => {
  const { formName, name, label, size, width, error, paddingHorizontal, info, infoColor } = props
  // please add new form type here for the new component
  const getDynamicComponent = () => {
    switch (formName) {
      case 'textinput':
        return TextInputEl
      case 'checkbox':
        return CheckboxEl
      case 'dropdown':
        return Dropdown
      case 'datepicker':
        return DatePicker
      case 'switch':
        return Switch

      default:
        return null
    }
  }
  let DynamicComponent = getDynamicComponent()
  return (
    <View style={{ ...formStyles.formElContainer, paddingHorizontal: paddingHorizontal, width }}>
      {label &&
        formName !== 'checkbox' &&
        formName !== 'radiogroup' &&
        formName !== 'checkgroup' &&
        formName !== 'checkBoxGroup' &&
        formName !== 'switch' && (
          <View style={formStyles.labelContainer}>
            <MyText fontStyle="medium" style={formStyles.label}>
              {label}
            </MyText>
          </View>
        )}
      <View style={{ zIndex: 100 }}>
        {DynamicComponent ? <DynamicComponent {...props} /> : <MyText>'Invalid form name'</MyText>}
      </View>
      {error && (
        <View style={formStyles.errorContainer}>
          <MyText style={formStyles.error} hasCustomColor>
            {error}
          </MyText>
        </View>
      )}
      {info && (
        <View style={formStyles.infoContainer}>
          <MyText style={{ ...formStyles.info, color: infoColor }} hasCustomColor>
            {info}
          </MyText>
        </View>
      )}
      {info && (
        <View style={formStyles.infoContainer}>
          <MyText style={{ ...formStyles.info, color: infoColor }} >{info}</MyText>
        </View>
      )}
    </View>
  )
}
Form.defaultProps = defaultProps
const formStyles = StyleSheet.create({
  formElContainer: {
    paddingVertical: formElContainerPadding,
    width: '100%',
  },
  error: {
    color: errorColor,
    fontSize: infoFontSize,
  },
  errorContainer: {
    marginTop: infoMarginTop,
  },
  infoContainer: { marginTop: infoMarginTop },
  info: { color: textColor, fontSize: infoFontSize },
  labelContainer: { marginBottom: infoMarginTop },
  label: {
    color: '#000',
  },
})

export default Form
