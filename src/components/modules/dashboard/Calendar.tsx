import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { MuiFormatDate } from 'utils'
import { CustomHeader } from 'components/elements/calendarHeader/CustomCalendarDay'
import { backgroundColor, calendarWeedkendColor } from 'styles/colors'
import { DashboardRoutes } from 'constants/routes'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import NormalHeader from 'components/elements/calendarHeader/NormalHeader'
import { useAppSelector } from 'redux/hook'
import Icon from 'components/elements/Icon'
import { useQuery } from '@tanstack/react-query'
import { getAllHolidays } from 'services/dashboard'
import moment from 'moment'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

type CalendarProps = {
  disabledByDefault?: boolean
  isDashboard?: boolean
  setSelectedDate?: React.Dispatch<React.SetStateAction<any>>
  selectedDate?: Object
  hideArrows?: boolean
  onMonthChange?: Function
  handleCalendarDayPress?: Function
}

const DashboardCalendar = ({
  setSelectedDate,
  selectedDate,
  disabledByDefault = false,
  isDashboard = false,
  hideArrows = false,
  onMonthChange,
  handleCalendarDayPress,
}: CalendarProps) => {
  const { colors } = useTheme()

  const [month, setMonth] = useState(moment())

  const navigation: NavigationProp<any, any> = useNavigation()
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const [theme, setTheme] = useState(darkMode)
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const customMarks = (startDate: string, endDate: string) => {
    const markedWeekends: any = {}

    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)

    while (currentDate <= lastDate) {
      const date = currentDate.toISOString().split('T')[0]
      const dayOfWeek = currentDate.getDay()

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        markedWeekends[date] = {
          selected: true,
          selectedColor: colors.headerBackground,
          selectedTextColor: calendarWeedkendColor,
        }
      } else {
        markedWeekends[date] = {
          selected: true,
          selectedColor: colors.headerBackground,
          selectedTextColor: colors.descriptionFont,
        }
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    const today = MuiFormatDate()
    const marked = {
      [today]: {
        selected: true,

        customStyles: {
          container: {
            backgroundColor: isDashboard ? '#05A9C5' : 'rgba(5, 169, 197, 0.6)',
          },
          text: {
            textAlign: 'center',
            marginTop: Platform.OS === 'ios' ? 4 : 0,
          },
        },
        //selectedColor: isDashboard ? '#05A9C5' : 'rgba(5, 169, 197, 0.6)',
        disableTouchEvent: false,
      },
    }

    return { ...markedWeekends, ...marked }
  }

  const { data: Holidays } = useQuery(['DashBoardHolidays'], () =>
    getAllHolidays({ sort: '-createdAt', limit: '1' })
  )

  const disabledDates = Holidays?.data?.data?.[0]?.holidays?.reduce((prev: any, curr: any) => {
    let tempDate = curr?.date?.split('T')?.[0]
    prev[tempDate] = {
      selected: true,
      selectedColor: tempDate === MuiFormatDate() ? '#05A9C5' : colors.headerBackground,
      selectedTextColor: tempDate === MuiFormatDate() ? 'white' : calendarWeedkendColor,
    }
    return prev
  }, {})

  useEffect(() => {
    setTheme(darkMode)
  }, [darkMode])

  const handleKeyPress = (e: any) => {
    if (isDashboard) {
      return navigation.navigate(DashboardRoutes.Calendar, { eDate: e })
    }
    handleCalendarDayPress && handleCalendarDayPress(e)
    setSelectedDate &&
      setSelectedDate({
        [e.dateString]: {
          selected: true,
          endingDay: true,
          textColor: 'red',
        },
      })
  }
  const panGesture = Gesture.Pan()
    .enabled(!disabledByDefault)
    .runOnJS(true)
    .onEnd((e) => {
      let newDate = null
      if (e.translationX > 0) {
        newDate = moment(date).subtract(1, 'M').format('YYYY-MM-DD')
        setDate(newDate)
      } else {
        newDate = moment(date).add(1, 'M').format('YYYY-MM-DD')
        setDate(newDate)
      }
    })
  return (
    <GestureDetector gesture={panGesture}>
      <Pressable onPress={() => isDashboard && navigation.navigate(DashboardRoutes.Calendar)}>
        <ScrollView>
          <View style={styles.main}>
            <View style={{ flex: 1 }}>
              <Calendar
                markingType={'custom'}
                key={theme}
                firstDay={1}
                initialDate={date}
                // style={{
                //   height: 200,
                //   dayText: { fontSize: 12 },
                // }}
                hideExtraDays
                enableSwipeMonths={!disabledByDefault}
                markedDates={{
                  ...customMarks(
                    moment(month).startOf('month').format('YYYY-MM-DD'),
                    moment(month).endOf('month').format('YYYY-MM-DD')
                  ),
                  ...selectedDate,
                  ...disabledDates,
                }}
                renderHeader={(date) =>
                  isDashboard ? (
                    <CustomHeader month={date.toString('MMMM dd, yyyy, dddd')} />
                  ) : (
                    <NormalHeader month={date.toString('MMMM , yyyy')} />
                  )
                }
                hideArrows={hideArrows}
                onMonthChange={(month: any) => {
                  setMonth(month?.dateString)

                  if (onMonthChange) onMonthChange(month)
                }}
                renderArrow={(direction) => (
                  <Icon
                    name="KeyboardRightArrow"
                    fill="#0074d9"
                    isFill
                    width={10}
                    containerStyles={{
                      transform: direction === 'left' ? 'rotate(180deg)' : 'none',
                      marginLeft: direction === 'left' ? 10 : 0,
                      marginRight: direction === 'right' ? 30 : 0,
                    }}
                  />
                )}
                disabledByDefault={disabledByDefault}
                // disableAllTouchEventsForDisabledDays={disabledByDefault}
                // disabledDaysIndexes={[1, 2, 3, 4, 5]}
                onDayPress={(e) => handleKeyPress(e)}
                style={{ borderRadius: 10, backgroundColor: colors.headerBackground }}
                theme={{
                  'stylesheet.calendar.header': {
                    dayTextAtIndex0: {
                      color: colors.descriptionFont,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                    dayTextAtIndex1: {
                      color: colors.descriptionFont,
                      fontWeight: 'bold',
                    },
                    dayTextAtIndex2: {
                      color: colors.descriptionFont,
                      fontWeight: 'bold',
                    },
                    dayTextAtIndex3: {
                      color: colors.descriptionFont,
                      fontWeight: 'bold',
                    },
                    dayTextAtIndex4: {
                      color: colors.descriptionFont,
                      fontWeight: 'bold',
                    },
                    dayTextAtIndex5: {
                      color: calendarWeedkendColor,
                      fontWeight: 'bold',
                    },
                    dayTextAtIndex6: {
                      color: calendarWeedkendColor,
                      fontWeight: 'bold',
                    },
                    dayHeader: {
                      fontSize: 12,
                      paddingRight: 7,
                    },
                    header: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: Platform.OS === 'ios' ? 8 : 0,
                      paddingRight: Platform.OS === 'ios' ? 70 : 90,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.calendarHeaderBorder,
                      marginTop: 6,
                      alignItems: 'center',
                    },
                    monthText: {
                      fontSize: 2,
                      margin: 5,
                    },
                  },
                  'stylesheet.day.basic': {
                    base: {
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      marginTop: -8,
                    },
                    text: {
                      fontSize: 14,
                      textAlign: 'center',
                      marginTop: 2,
                    },
                  },

                  calendarBackground: colors.headerBackground,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </Pressable>
    </GestureDetector>
  )
}

export default DashboardCalendar

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
})
