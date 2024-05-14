import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { fontFamilyType } from 'helpers/constants'
import * as React from 'react'
import { Pressable, useColorScheme, View } from 'react-native'
import Modal from 'react-native-modal'
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { backgroundColor, borderColor, primaryColor, textColor } from 'styles/colors'
import Icon from '../Icon'
import TextInput from './TextInput'

interface IDatePickerProps {
  value?: string
  placeholder?: string
  onDateChange?: Function
  onTimeChange?: Function
  mode?: 'datepicker' | 'calendar' | 'monthYear' | 'time'
  datePickerOptions?: Object
  error?: string
  displayValue?: string
}

const defaultProps = {
  placeholder: '',
  onDateChange: () => { },
  onTimeChange: () => { },
  datePickerOptions: {},
  error: '',
}
const DatePickerEl: React.FunctionComponent<IDatePickerProps> = (props) => {
  const {
    value,
    placeholder,
    onDateChange,
    mode,
    datePickerOptions,
    error,
    onTimeChange,
    displayValue,
  } = props
  const [modalVisible, setModalVisible] = React.useState(false)
  const scheme = useColorScheme()
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <View pointerEvents="none">
          <TextInput
            value={displayValue ?? value}
            hasIcon
            rightIcon={<Icon name={mode === 'time' ? 'clock' : 'calendar'} />}
            placeholder={placeholder}
            error={error}
            iconToRight
          />
        </View>
      </Pressable>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          style={{ paddingHorizontal: 10 }}
          animationIn="slideInUp"
          animationOut="fadeOut"
          backdropOpacity={0.5}
          animationOutTiming={300}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating
          backdropTransitionInTiming={1000}
          onBackdropPress={() => setModalVisible(false)}
          backdropColor={scheme === 'dark' ? '#ffffff20' : '#5e5d5d'}
        >
          <DatePicker
            {...props}
            selected={value}
            options={{
              defaultFont: fontFamilyType.light,
              headerFont: fontFamilyType.bold,
              ...datePickerOptions,
              borderColor: 'transparent',
              textHeaderColor: scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text,
              selectedTextColor:
                scheme === 'dark' ? DefaultTheme.colors.text : DarkTheme.colors.text,
              mainColor: scheme === 'dark' ? DarkTheme.colors.text : primaryColor,
              textDefaultColor:
                scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text,
              backgroundColor: scheme === 'dark' ? DarkTheme.colors.background : backgroundColor,
            }}
            mode={mode || 'calendar'}
            onDateChange={(date: string) => {
              const formattedDate = date.replaceAll('/', '-')
              if (onDateChange) onDateChange(formattedDate)
              setModalVisible(false)
            }}
            onTimeChange={(selectedTime) => {
              if (onTimeChange) onTimeChange(selectedTime)
              setModalVisible(false)
            }}
            style={{ borderRadius: 12, borderColor: borderColor }}
          />
        </Modal>
      )}
    </View>
  )
}

DatePickerEl.defaultProps = defaultProps
export default DatePickerEl
