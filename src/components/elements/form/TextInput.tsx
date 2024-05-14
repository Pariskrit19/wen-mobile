import { DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native'
import * as React from 'react'
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  useColorScheme,
  View,
} from 'react-native'
import { useAppSelector } from 'redux/hook'
import {
  borderColor,
  errorBackgroundColor,
  errorColor,
  secondaryColor,
  textColor,
} from 'styles/colors'
import { flexStyles } from 'styles/flex'
import {
  inputBorderRadius,
  inputHeight,
  inputMarginVertical,
  inputPadding,
  inputWidth,
} from 'styles/variables'
import { isEmpty } from 'utils'
import MyText from '../MyText'

type TextInputElProps = {
  styles?: TextStyle
  viewStyles?: Object
  onChangeText?: Function
  value?: string
  placeholder?: string
  keyboardType?: KeyboardTypeOptions
  iconToLeft: boolean
  icon?: React.ReactElement
  rightIcon?: React.ReactElement
  error?: string
  secure?: boolean
  multiline?: boolean
  readOnly?: boolean
  placeholderTextColor?: string
  inputMode?: string
  modelOpen?: boolean
  showErrorMessage?: boolean
}
const defaultProps = {
  onChangeText: (value: string) => {},
  styles: {},
  viewStyles: {},
  secure: false,
  placeholder: '',
  keyboardType: 'default',
  iconToLeft: false,
  iconToRight: false,
  error: '',
  value: '',
  isPasswordtype: false,
  multiline: false,
  readOnly: false,
  inputMode: 'text',
  modelOpen: false,
  showErrorMessage: true,
}
function TextInputEl(props: TextInputElProps & typeof defaultProps & TextInputProps) {
  const {
    styles,
    onChangeText,
    value,
    placeholder,
    keyboardType,
    iconToLeft,
    iconToRight,
    icon,
    rightIcon,
    error,
    viewStyles,
    secure,
    multiline,
    readOnly,
    placeholderTextColor,
    inputMode,
    modelOpen,
    showErrorMessage,
  } = props
  const scheme = useColorScheme()
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const { colors } = useTheme()
  return (
    <>
      <View
        style={{
          ...inputStyles.inputContainer,
          ...viewStyles,
          ...(!iconToLeft && flexStyles.justifyBetween),
          paddingTop: multiline ? 10 : 0,
          borderColor: !isEmpty(error) ? errorColor : colors.cardBorder,
          backgroundColor: !isEmpty(error)
            ? errorBackgroundColor
            : readOnly && !modelOpen
            ? colors.textInputDisabled
            : colors.lighterBackground,
        }}
      >
        <>
          {iconToLeft ? <View style={inputStyles.iconContainer}>{icon}</View> : null}
          <TextInput
            {...props}
            style={{
              ...inputStyles.input,
              ...styles,
              color: styles.color
                ? styles.color
                : darkMode
                ? DarkTheme.colors.text
                : DefaultTheme.colors.text,
            }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            inputMode={inputMode}
            secureTextEntry={secure}
            placeholder={placeholder}
            keyboardType={keyboardType}
            inlineImageLeft={'message'}
            textAlignVertical={multiline ? 'top' : 'center'}
            placeholderTextColor={
              placeholderTextColor
                ? placeholderTextColor
                : darkMode
                ? colors.descriptionFont
                : textColor
            }
            multiline={multiline}
            numberOfLines={multiline ? 5 : 1}
            readOnly={readOnly}
          />
          {iconToRight ? <View style={inputStyles.iconContainer}>{rightIcon}</View> : null}
        </>
      </View>
      {error && showErrorMessage && (
        <MyText style={inputStyles.errorText} hasCustomColor>
          {error}
        </MyText>
      )}
    </>
  )
}

TextInputEl.defaultProps = defaultProps
const inputStyles = StyleSheet.create({
  inputContainer: {
    width: inputWidth,
    height: inputHeight,
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: borderColor,
    borderRadius: inputBorderRadius,
    paddingHorizontal: inputPadding,
    marginVertical: inputMarginVertical,
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0,
    height: inputHeight,
    flex: 1,
  },
  iconContainer: {
    height: inputHeight,
    paddingVertical: inputPadding,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 15,
  },
  errorText: {
    color: secondaryColor,
    marginBottom: 4,
  },
})
export default TextInputEl
