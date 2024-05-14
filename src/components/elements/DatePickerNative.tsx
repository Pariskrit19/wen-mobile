import DateTimePicker from '@react-native-community/datetimepicker'
import { useTheme } from '@react-navigation/native'
import moment from 'moment'
import * as React from 'react'
import { Platform, Pressable, View } from 'react-native'
import Modal from 'react-native-modal'
import Icon from './Icon'
import TextInputEl from './form/TextInput'

interface IDatePickerProps {
  mode?: 'date' | 'time' | 'datetime' | 'countdown'
  placeholder?: string
  error?: string
  value: any
  onChange: Function
  style: Object
  readOnly?: boolean
  maxDate?: Date
  minDate?: Date
}

const DatePickerNative = ({
  mode,
  placeholder,
  error,
  value,
  onChange,
  style,
  readOnly = false,
  maxDate,
  minDate,
}: IDatePickerProps) => {
  const [show, setShow] = React.useState<boolean>(false)
  const { colors } = useTheme()
  
  return (
    <View style={style}>
      <Pressable onPress={() => !readOnly && setShow(true)}>
        <View pointerEvents="none">
          <TextInputEl
            value={`${moment(value).format('YYYY-MM-DD')}`}
            rightIcon={<Icon name={mode === 'time' ? 'clock' : 'calendar'} />}
            placeholder={placeholder}
            error={error}
            iconToRight
            viewStyles={{ marginVertical: 0 }}
            onChangeText={() => onChange()}
            readOnly={readOnly}
          />
        </View>
      </Pressable>

      {Platform.OS === 'android' ? (
        show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            maximumDate={maxDate}
            minimumDate={minDate}
            onChange={(event, selectedDate) => {
              setShow(false)
              onChange(selectedDate)
            }}
            style={{ backgroundColor: colors.background  }}
          />
        )
      ) : (
        <Modal
          isVisible={show}
          style={{ backgroundColor: 'transparent' }}
          onBackdropPress={() => setShow(false)}
        >
          <DateTimePicker
            testID="dateTimePicker"
            display="inline"
            value={value}
            mode={mode}
            maximumDate={maxDate}
            minimumDate={minDate}
            onChange={(event, selectedDate) => {
              setShow(false)
              onChange(selectedDate)
            }}
            style={{ backgroundColor: colors.background }}
          />
        </Modal>
      )}
    </View>
  )
}

export default DatePickerNative
