import * as React from 'react'
import TextInputEl from './TextInput'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { GestureResponderEvent } from 'react-native-modal'
import Icon from '../Icon'
import { useTheme } from '@react-navigation/native'

interface PasswordInputtype {
  value?: string
  onChangeText?: (value: string) => void
  placeholder?: string
  error?: string
}

interface IPressComponent {
  children: React.ReactNode
  onPress: (event: GestureResponderEvent) => void
}

const defaultProps = {
  onChangeText: (value: string) => {},
  value: '',
}

const PressComponent: React.FunctionComponent<IPressComponent> = ({ children, ...props }) => {
  return <Pressable onPress={props.onPress}>{children}</Pressable>
}

const PasswordInput: React.FunctionComponent<PasswordInputtype> = (props) => {
  const [hidePassword, setHidePassword] = React.useState<boolean>(true)
  const { colors } = useTheme()

  const showIcon = (
    <Pressable onPress={() => setHidePassword(true)}>
      <Icon width="18" height="30" name="ShowPassword" isFill fill={colors.iconColor} />
    </Pressable>
  )
  const notShowIcon = (
    <Pressable onPress={() => setHidePassword(false)}>
      <Icon width="20" height="30" name="HidePassword" isFill fill={colors.iconColor} />
    </Pressable>
  )

  const passwordIcon = hidePassword ? notShowIcon : showIcon

  return (
    <TextInputEl
      value={props.value}
      placeholder={props.placeholder}
      secure={hidePassword}
      onChangeText={props.onChangeText}
      error={props.error}
      viewStyles={{ marginVertical: 0 }}
      iconToRight={true}
      rightIcon={passwordIcon}
    />
  )
}

PasswordInput.defaultProps = defaultProps

export default PasswordInput
