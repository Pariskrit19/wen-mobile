import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native'
import {
  backgroundColor,
  borderColor,
  cardColor,
  primaryColor,
  textColor,
  notificationColor,
  secondaryColor,
  darkButtonColor,
  filledColor,
  descriptionFontColor,
  headerFontColor,
  headerBorderColor,
  defaultPinkColor,
  semiWhiteColor,
  blackColor,
  headerBackgroundColor,
  semiGreyColor,
} from 'styles/colors'
import { MyThemeType } from 'ts/types'

export const MyTheme: MyThemeType = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    secondary: secondaryColor,
    background: backgroundColor,
    card: cardColor,
    text: textColor,
    border: borderColor,
    notification: notificationColor,
    avatarBg: 'rgba(66, 66, 67, 0.1)',
    lighterBackground: cardColor,
    placeholderTextColor: 'rgba(30, 30, 30, 0.8)',
    disabledDate: headerBorderColor,
    resetButton: semiGreyColor,
    dropdownboxColor: 'rgba(238, 238, 238, 0.7)',
    dropdownBackground: 'rgba(255, 255, 255, 0.7)',
    filledColor: backgroundColor,

    //global
    secondBackground: cardColor,
    headerFont: headerFontColor,
    subHeaderFont: headerFontColor,
    descriptionFont: '#606060',
    headerBackground: cardColor,
    headerBorder: headerBorderColor,
    semiCardBackground: cardColor,
    cardBorder: headerBorderColor,
    tabBackground: '#EEEEEE',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    detailField: semiGreyColor,
    iconColor: headerFontColor,
    semiIconColor: headerFontColor,
    blackAndWhite: blackColor,
    calendarMonthText: headerFontColor,

    //dashbard
    calendarHeaderBorder: headerBorderColor,
    calendarLiveTime: '#4363C6',
    iconBackground: 'rgba(5, 169, 197, 0.2)',
    notificationIcons: '#05A9C5',
    noticeTypeBackground: 'rgba(131, 161, 255, 0.2)',
    noticeTypeText: '#4363C6',
    noticeBoardBackground: 'rgb(240,240,240)',
    noticeEventType: '#606060',
    textInputDisabled: '#F1F1F1',
    upComingActivitiesBg: backgroundColor,

    //project
    projectListTitle: '#4363c6',
    projectListTitleField: semiGreyColor,
    projectListValueField: 'rgba(96, 96, 96, 0.8)',

    //attendance
    punchInOutTime: '#999999',
    yearFilter: semiGreyColor,
    attendanceWeekend: '#feedf1',
    attendanceWeekendText: defaultPinkColor,
    calendarTitle: backgroundColor,
    calendarDateBackground: cardColor,
    totalWorkingHours: headerFontColor,
    attendanceSubDatas: '#f8f8f8',
    attendanceHistory: cardColor,
    attendanceTitleBorder: '#EEEEEE',
    detailFieldSpecial: semiGreyColor,

    //leave
    tabCountQuarter: '#FFEEF2',
    tabCountAnnual: '#FFF3E8',
    leaveTabBar: semiWhiteColor,
    leaveArrowContainer: 'rgba(66, 66, 67, 0.1)',
    leaveTotalUsed: '#777777',
    leaveDaysTotalUsed: semiGreyColor,

    //auth
    otpBoxesBackground: cardColor,
    otpFocused: blackColor,
  },
}

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    avatarBg: 'rgba(155, 155, 155, 0.2)',
    header: '#222222',
    lighterBackground: filledColor,
    placeholderTextColor: descriptionFontColor,
    disabledDate: '#c0cc74',
    dropdownBackground: 'rgba(45, 45, 45, 0.7)',
    resetButton: darkButtonColor,
    dropdownboxColor: 'rgba(45, 45, 45, 0.7)',
    filledColor: filledColor,

    //global
    secondBackground: '#121212',
    headerFont: cardColor,
    subHeaderFont: semiWhiteColor,
    descriptionFont: descriptionFontColor,
    headerBackground: headerBackgroundColor,
    headerBorder: '#222222',
    semiCardBackground: filledColor,
    cardBorder: filledColor,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    tabBackground: '#181818',
    detailField: descriptionFontColor,
    iconColor: descriptionFontColor,
    semiIconColor: cardColor,
    blackAndWhite: cardColor,
    calendarMonthText: 'rgb(229, 229, 231)',

    //dashboard
    calendarHeaderBorder: '#333333',
    calendarLiveTime: '#05A9C5',
    iconBackground: 'rgba(5, 169, 197, 0.7)',
    notificationIcons: cardColor,
    noticeTypeBackground: '#4363C6',
    noticeTypeText: cardColor,
    noticeBoardBackground: 'rgba(155,155,155,0.3)',
    noticeEventType: 'white',
    textInputDisabled: '#9e9e9e91',
    upComingActivitiesBg: filledColor,

    //project
    projectListTitle: semiWhiteColor,
    projectListTitleField: '#AAAAAA',
    projectListValueField: '#9B9B9B',

    //attendance
    punchInOutTime: descriptionFontColor,
    yearFilter: semiWhiteColor,
    attendanceWeekend: defaultPinkColor,
    attendanceWeekendText: cardColor,
    calendarTitle: headerBackgroundColor,
    calendarDateBackground: 'rgba(155, 155, 155, 0.2)',
    totalWorkingHours: '#CCCCCC',
    attendanceSubDatas: filledColor,
    attendanceHistory: darkButtonColor,
    attendanceTitleBorder: 'rgba(238, 238, 238, 0.5)',
    detailFieldSpecial: '#EBEBEB',

    //leave
    tabCountQuarter: filledColor,
    tabCountAnnual: '#2F2F2F',
    leaveTabBar: headerBackgroundColor,
    leaveArrowContainer: filledColor,
    leaveTotalUsed: descriptionFontColor,
    leaveDaysTotalUsed: semiWhiteColor,

    //auth
    otpBoxesBackground: '#222222',
    otpFocused: '#444444',
  },
}
