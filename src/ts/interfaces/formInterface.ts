import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import { ReactElement } from 'react'
import { dropdownItems } from 'ts/types'

export interface basicInputInterface {
  name?: string
  value?: any
  onChange?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined
  onChangeText?: Function & ((value: string) => void)
  onPress?: Function & (() => void)
  label?: string
  placeholder?: string
  size?: number
  width?: number | string
  disabled?: boolean
  onKeyUp?: Function
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined
  options?: any[]
  error?: string
  className?: string
  icon?: ReactElement
  styles?: Object
  paddingHorizontal?: number
  info?: string
  infoColor?: string
  onImagePick?: Function
  onFilePick?: Function
  mode?: any
  displayValue?: string
}

export interface otherInputInterface extends basicInputInterface {
  minValue?: string
  maxValue?: string
  type?: string
  autoFocus?: boolean
  innerLabel?: string
  hasIcon?: boolean
  iconToLeft?: boolean
  keyboardType?: KeyboardTypeOptions
}

export interface otherTimePickerInterface extends basicInputInterface {
  time?: string
  defaultMeridiem?: string
}
export interface reactSelectInterface extends basicInputInterface {
  isArray?: boolean
  isArrayKeys?: boolean
  isAbove?: boolean
  multiple?: boolean
  loading?: boolean
  loadingType?: string
}

export interface checkRadioInterface extends basicInputInterface {
  checked?: boolean
  labelPosition?: string
}

export interface dateRangeInterface extends otherInputInterface {
  startDate?: any
  endDate?: any
}
export interface datepickerInterface extends otherInputInterface {
  onDateChange?: (dateString: string) => void
  onTimeChange?: (timeString: string) => void
  datePickerOptions?: Object
}

export interface textEditorInterface extends basicInputInterface {
  toolbarId?: string
}

export interface singleDocsInterface extends basicInputInterface {
  btnText?: string
  extraClassName?: string
}

export interface ydmInputCommonInterface extends basicInputInterface {
  monthValue?: string | number
  yearValue?: string | number
  dayValue?: string | number
  inputShow?: any
  // inputShow?:string[] | 'all' | 'months' | 'years' | 'days',
}

export interface ydmWholeInterface extends ydmInputCommonInterface {
  value: ydmValueProps
  inputShow?: string[] | 'all' | 'months' | 'years' | 'days'
}

interface ydmValueProps {
  month?: string | number
  year?: string | number
  day?: string | number
}

export interface checkdGroupProps extends basicInputInterface {
  checkGroupArray?: any[]
  checkedGroupValue?: any[]
}

export interface chipsInputProps extends basicInputInterface {
  chipsArray?: []
  badgeColor?: string
  multiple?: boolean
}
export interface dropdownProps extends basicInputInterface {
  items?: Array<dropdownItems>
  setValue?: Function
  setItems?: Function
  prefixIconName?: string
}
export interface switchProps extends basicInputInterface {
  trackColor?: string
  thumbColor?: string
  trackEnableColor?: string
  thumbEnableColor?: string
}
export interface wholeFormInterface
  extends singleDocsInterface,
    checkRadioInterface,
    reactSelectInterface,
    otherInputInterface,
    textEditorInterface,
    dateRangeInterface,
    checkdGroupProps,
    chipsInputProps,
    dropdownProps,
    datepickerInterface,
    ydmInputCommonInterface,
    switchProps {
  formName:
    | 'textinput'
    | 'textarea'
    | 'reactselect'
    | 'checkBoxGroup'
    | 'dateinput'
    | 'customdateinput'
    | 'chipsinput'
    | 'singledocumentinput'
    | 'checkgroup'
    | 'asyncautoselect'
    | 'reactdaterange'
    | 'reactcalendar'
    | 'searchInput'
    | 'timepicker'
    | 'radiogroup'
    | 'ydmInput'
    | 'selectInput'
    | 'texteditor'
    | 'dragAndDropUpload'
    | 'switch'
    | 'dragAndDropUpload'
    | 'datepicker'
    | 'checkbox'
    | 'dropdown'
    | 'imagePicker'
    | 'filePicker'
  alignment?: string
  validators?: any
  isNepali?: boolean
  isDateRange?: boolean
  minDate?: string
  maxDate?: string
  isFullDetails?: boolean
  isTextInNepali?: boolean
  leftLabel?: any
  rightLabel?: any
}
