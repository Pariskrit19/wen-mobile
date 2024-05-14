import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, FlatList, StyleSheet, Pressable } from 'react-native'
import moment from 'moment'
import { useFocusEffect, useRoute, useTheme } from '@react-navigation/native'
import DashboardCalendar from 'components/modules/dashboard/Calendar'
import MyText from 'components/elements/MyText'
import { DaysConstant, FONT_CONST } from 'helpers/constants'
import AttendanceCalendarDate from 'components/modules/attendances/AttendanceCalendarDate'
import { useQuery } from '@tanstack/react-query'
import { getAllNotices } from 'services/noticeBoard'
import { getAllHolidays } from 'services/dashboard'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import CalendarDetailModal from 'components/modules/dashboard/CalendarDetailModal'
import { extendDates, sortFromDate } from 'helpers/utils'
import EventModal from 'components/modules/dashboard/calendars/EventModal'
import { useAppSelector } from 'redux/hook'
import OfflineWrapper from 'components/modules/OfflineWrapper'
import NotFound from 'components/elements/NotFound'
import Icon from 'components/elements/Icon'

const CalendarScreen = ({ navigation }: any) => {
  const route = useRoute<any>()
  const scrollRef = useRef()
  const eventDate = route.params
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const { colors } = useTheme()
  const [calendarData, setCalendarData] = useState<any[]>()
  const [modalVisible, setModalVisible] = useState(false)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [currentMonthDate, setCurrentMonthDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? '0' : ''}${
      new Date().getMonth() + 1
    }`
  )
  const { data: NoticeDatas } = useQuery(['notices'], () => getAllNotices({}), {
    enabled: !isOffline,
    select: (res) => {
      return res?.data?.data?.map((d) => extendDates(d))
    },
  })

  const { data: HolidayDatas } = useQuery(
    ['calendarHolidays'],
    () => getAllHolidays({ sort: '-createdAt', limit: '1' }),
    {
      enabled: !isOffline,
      select: (res) => {
        const holidaysArr = res?.data?.data?.[0]?.holidays
        const response = holidaysArr?.map((d: any) => ({
          _id: d?._id,
          date: d?.date,
          details: d?.remarks,
          title: d?.title,
          type: 'Holiday',
        }))

        return response
      },
    }
  )

  const monthlyEvents = sortFromDate(
    [...(NoticeDatas?.flat() || []), ...(HolidayDatas || [])]?.filter((d) =>
      d?.date?.includes(currentMonthDate)
    )
  )

  const [selectedDate, setSelectedDate] = useState({
    [moment().format('YYYY-MM-DD')]: {
      selected: true,
      endingDay: true,
      dotColor: '#50cebb',
      selectedDotColor: 'red',
    },
  })

  useEffect(() => {
    let dataIndex = monthlyEvents.findIndex((d: any) =>
      d.date.includes(eventDate?.eDate?.dateString)
    )
    let timeRef: any
    if (eventDate && dataIndex >= 0) {
      timeRef = setTimeout(
        () =>
          scrollRef?.current?.scrollToIndex({
            index: dataIndex,
            animated: true,
          }),
        1000
      )
    }

    return () => clearTimeout(timeRef)
  }, [monthlyEvents])
  const handleRender = ({ item, index }: any) => {
    const handlePress = () => {
      bottomSheetModalRef.current?.present(item)
      bottomSheetModalRef.current?.snapToIndex(0)
    }
    return (
      <View
        style={[
          styles.renderedItem,
          {
            backgroundColor: colors.lighterBackground,
            // paddingBottom: index === monthlyEvents.length - 1 ? 25 : 10,
          },
        ]}
      >
        <Pressable onPress={handlePress} style={styles.leaveChildContainer}>
          <AttendanceCalendarDate
            day={DaysConstant[moment(item?.date)?.day()]}
            date={item?.date?.split('T')?.[0]?.split('-')?.[2]}
            selectedDate={eventDate?.eDate.day}
          />
        </Pressable>
        <Pressable
          onPress={handlePress}
          style={{
            ...styles.descriptionStyle,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: item.type === 'Holiday' ? '#c16262' : '#4D97E1',
          }}
        >
          <Icon
            name={item?.type === 'Holiday' ? 'holidayDashboardIcon' : 'upcomingActivities'}
            width={18}
            height={18}
            isFill
            fill={'white'}
            containerStyles={{ marginLeft: 10 }}
          />
          <MyText
            style={{ ...styles.dateDay, color: 'white' }}
            hasCustomColor
            fontStyle={FONT_CONST.rubikMedium}
            numberOfLines={1}
          >
            {item?.title}
          </MyText>
        </Pressable>
      </View>
    )
  }

  const handleMonthChange = (e: any) => {
    setCurrentMonthDate(`${e?.year}-${e?.month < 10 ? '0' : ''}${e?.month}`)
  }

  const handleCalendarDayPress = (e: any) => {
    let data = monthlyEvents.filter((d: any) => d.date.includes(e?.dateString))
    setCalendarData(data.length ? data : { isNoEvent: true, date: e?.dateString })
    setModalVisible(true)
  }

  const handleModal = () => {
    setModalVisible((prev) => !prev)
  }

  return (
    <OfflineWrapper>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <CalendarDetailModal bottomSheetModalRef={bottomSheetModalRef} />
          {modalVisible && (
            <EventModal data={calendarData} modalVisible={modalVisible} handleModal={handleModal} />
          )}
          <DashboardCalendar
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            onMonthChange={handleMonthChange}
            handleCalendarDayPress={handleCalendarDayPress}
          />
          <View style={{ marginTop: 2, backgroundColor: 'white' }}>
            <MyText
              style={{
                ...styles.monthlyEvent,
                backgroundColor: colors.lighterBackground,
              }}
              fontStyle={FONT_CONST.extraBold}
            >
              Monthly Events
            </MyText>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={monthlyEvents}
              ref={scrollRef}
              keyExtractor={(item) => item?._id}
              renderItem={handleRender}
              initialNumToRender={60}
              ListFooterComponent={<View style={{ paddingBottom: 20 }}></View>}
              ListEmptyComponent={
                <NotFound
                  style={{ marginHorizontal: 5 }}
                  title={'No events are on the agenda for this month.'}
                />
              }
            />
          </View>
        </View>
      </BottomSheetModalProvider>
    </OfflineWrapper>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  renderedItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  monthlyEvent: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  dateDay: {
    fontSize: 14,
    width: '80%',
    marginLeft: 10,
    borderRadius: 15,
  },
  leaveChildContainer: {
    flex: 1,
  },
  descriptionStyle: {
    flex: 7,
    display: 'flex',
    // justifyContent: 'center',
    // paddingLeft: 5,
    height: 35,
    borderRadius: 13,
  },
})
