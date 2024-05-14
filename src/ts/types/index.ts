import { Theme } from '@react-navigation/native'

export type genericObj = {
  [key: string]: any
}

export type errorDialog = {
  showModal: boolean
  title: string
  msg: string
  iconName: string
}

export type fontFamilyOptions = {
  [key: string]: string
}

export type dropdownItems = {
  label: string
  value: string
  icon?: any
  iconName?: any
  nonListIcon?: boolean
  items?: dropdownItems[]
}

export type fontWeightType =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

export type MyCustomThemeType = {
  dark: boolean
  colors: {
    secondary: string
    avatarBg: string
    lighterBackground: string
    placeholderTextColor: string
    otpFocused: string
    attendanceSubDatas: string
    secondBackground: string
    leaveTabBar: string
    disabledDate: string
    iconColor: string
    calendarTitle: string
    resetButton: string
    dropdownboxColor: string
    attendanceHistory: string
    calendarDayText: string
    calendarMonthText: string
  }
}

export type MyThemeType = MyCustomThemeType & Theme
