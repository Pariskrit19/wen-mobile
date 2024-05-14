import * as React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  AppState,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'
import { commonToast } from 'helpers/utils'
import { useToast } from 'react-native-toast-notifications'

interface OTPtype {
  setIsPinReady: React.Dispatch<React.SetStateAction<boolean>>
  setCode: React.Dispatch<React.SetStateAction<string>>
}

const OTPComponent: React.FunctionComponent<OTPtype> = ({ setCode, setIsPinReady }) => {
  const [otp, setOtp] = React.useState(['', '', '', ''])
  const toast = useToast()
  const otpInputs = React.useRef<TextInput[]>([])
  const [copiedCode, setCopiedCode] = React.useState('')
  const { colors } = useTheme()
  const appState = React.useRef(AppState.currentState)
  const [appOpened, setAppOpened] = React.useState(false)

  const handleInputChange = async (index: number, value: string) => {
    let newOtp = []
    const regex = /^\d+$/

    if (value && !regex.test(value) && !copiedCode) {
      return commonToast({
        toast: toast,
        message: 'The input must contain numbers only',
        type: 'warning',
      })
    }

    if (copiedCode) {
      newOtp = copiedCode
        .slice(0, otp.length) // Only consider the first 4 characters
        .split('')
        .map((char) => (char === ' ' ? '' : char)) // Remove spaces if any

      // Focus on the first input after pasting
      await Clipboard.setStringAsync('')
      setCopiedCode('')
      if (value && copiedCode && !regex.test(copiedCode)) {
        return commonToast({
          toast: toast,
          message: 'The input must contain numbers only',
          type: 'warning',
        })
      }
      otpInputs.current[3]?.focus()
    } else {
      newOtp = [...otp]
      newOtp[index] = value
      // Move to the next input field if the current one is filled
      if (value !== '' && index < otp.length - 1) {
        otpInputs.current[index + 1].focus()
      }
    }

    setOtp(newOtp)
    setCode(newOtp.join(''))

    setIsPinReady(newOtp.every((code) => code))
  }

  const onKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      otpInputs.current[index - 1].focus()
    }
  }

  const getCopiedText = async () => {
    const code = await Clipboard.getStringAsync()
    if (code) setCopiedCode(code)
  }

  React.useEffect(() => {
    otpInputs.current[0]?.focus()

    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        setAppOpened(true)
      }

      if (nextAppState === 'background') setAppOpened(false)

      appState.current = nextAppState
    })
    return () => {
      subscription.remove()
    }
  }, [])

  React.useEffect(() => {
    if (appOpened) getCopiedText()
  }, [appOpened])

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (otpInputs.current[index] = ref)}
          style={[styles.input, { borderColor: colors.headerBorder, color: colors.blackAndWhite }]}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(value) => handleInputChange(index, value)}
          onKeyPress={(e) => onKeyPress(e, index)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    columnGap: 25,
  },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 12,
    minWidth: 70,
    height: 70,
    justifyContent: 'center',
    fontSize: 28,
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
  },
})

export default OTPComponent
