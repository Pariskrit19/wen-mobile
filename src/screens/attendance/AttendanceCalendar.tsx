import React, { useEffect, useRef, useState } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import { NavigationProp, useTheme } from '@react-navigation/native'
import AttendanceWeekend from 'components/modules/attendances/AttendanceHoliday'
import AttendanceLeaveHoliday from 'components/modules/attendances/AttendanceLeave'
import AttendanceData from 'components/modules/attendances/AttendanceDatas'
import SubDatas from 'components/modules/attendances/SubDatas'
import AttendanceTitle from 'components/modules/attendances/AttendanceTitle'
import MonthCarousel from 'components/modules/attendances/MonthCarousel'
import MyText from 'components/elements/MyText'
import { getOfficeYearns } from 'utils'
import Dropdown from 'components/elements/Dropdown'
import Icon from 'components/elements/Icon'
import { searchAttendacentOfUser } from 'services/attendance'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import { getAllHolidays } from 'services/dashboard'
import { getLeavesOfUser } from 'services/leaves'
import { FlatList, Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  SATURDAY,
  SUNDAY,
  getAPIDateFormat,
  getMonthDates,
  milliSecondIntoHours,
} from 'helpers/utils'
import { FONT_CONST } from 'helpers/constants'
import { useAppSelector } from 'redux/hook'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import OfflineWrapper from 'components/modules/OfflineWrapper'
import Animated from 'react-native-reanimated'
import AttendanceSharing from 'components/modules/attendances/AttendanceSharing'

interface AttendanceeProps {
  navigation: NavigationProp<any, any>
}

const AttendanceCalendar: React.FunctionComponent<AttendanceeProps> = ({ navigation }) => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const [open, setOpen] = useState(false)
  const [multiData, setMultiData] = useState<any>(undefined)
  const [isMulti, setIsMulti] = useState<Boolean>(false)
  const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(`${new Date().getFullYear()}`)
  const { colors } = useTheme()
  const [weekendsDate, setWeekendsDates] = useState<any>([])
  const [page, setPage] = useState({ page: 1, limit: 50 })
  const [sort, setSort] = useState({
    order: 'ascend',
    field: 'attendanceDate',
    columnKey: 'attendanceDate',
  })
  const carouselRef = useRef()

  const officeDates = getOfficeYearns()
  const { fromDate, toDate } = getAPIDateFormat(selectedYear, monthIndex)

  const { data: Attendances, refetch: attendanceRefetch } = useQuery(
    ['userAttendance', selectedYear, monthIndex, authUser?._id],
    () => {
      let sortField = ''
      if (sort?.order) {
        const order = sort.order === 'ascend' ? '' : '-'
        sortField = `${order}${sort.columnKey}`
      }
      let requireDates = getAPIDateFormat(selectedYear, monthIndex)
      return searchAttendacentOfUser({
        userId: authUser?._id,
        fromDate: requireDates?.fromDate,
        toDate: requireDates?.toDate,
        sort: sortField,
        page: page.page + '',
        limit: page.limit + '',
      })
    },
    {
      select: (data: any) =>
        data?.data?.attendances?.[0]?.data?.map((attendance: any) => ({
          id: attendance?._id?.attendanceDate,
          date: attendance?._id?.attendanceDate?.split('T')?.[0],
          punchInTime: moment(attendance?.data?.[0]?.punchInTime).format('HH:mm:ss'),
          sortNum: 2,
          punchOutTime: attendance?.data?.at(-1)?.punchOutTime
            ? attendance?.data?.length > 1
              ? moment(attendance?.data?.at(-1)?.punchOutTime).format('HH:mm:ss')
              : moment(attendance?.data?.[0]?.punchOutTime).format('HH:mm:ss')
            : undefined,
          isMultiple: attendance?.data?.length > 1,
          punchTimeDifference: `${milliSecondIntoHours(attendance?.officehour)}`?.trim(),
          punchInNote: attendance?.data?.[0]?.punchInNote?.trim() || '',
          punchOutNote: attendance?.data?.[0]?.punchOutNote?.trim() || '',
          subData:
            attendance?.data?.length > 1 &&
            attendance?.data.map((d: any) => ({
              ...d,
              punchInNote: d?.punchInNote?.trim() || '',
              punchOutNote: d?.punchOutNote?.trim() || '',
              date: attendance?._id?.attendanceDate?.split('T')?.[0],
              punchInTime: moment(d?.punchInTime).format('HH:mm:ss'),
              punchOutTime: d?.punchOutTime
                ? moment(d?.punchOutTime).format('HH:mm:ss')
                : undefined,
              punchTimeDifference: `${milliSecondIntoHours(d?.punchTimeDifference)}`?.trim(),
            })),
          officeHours: attendance?.officehour,
        })),
      enabled: !isOffline,
    }
  )

  const { data: Holidays, refetch: holidaysRefetch } = useQuery(
    ['DashBoardHolidays'],
    () => getAllHolidays({ sort: '-createdAt', limit: '1' }),
    {
      select: (data) => {
        const monthHoliday = data?.data?.data?.[0]?.holidays
          ?.filter((holiday: any) => moment(holiday.date).isBetween(fromDate, toDate))
          ?.map((d: any) => ({
            id: d?._id,
            isHoliday: true,
            date: d.date?.split('T')?.[0],
            name: d.title,
            holidayName: d.title,
          }))
        return monthHoliday
      },
      enabled: !isOffline,
    }
  )

  const { data: leavesData, refetch: leavesRefetch } = useQuery(
    ['userLeaves', selectedYear, monthIndex, authUser?._id],
    () => {
      let requireDates = getAPIDateFormat(selectedYear, monthIndex)
      return getLeavesOfUser({
        id: authUser?._id,
        status: 'approved',
        date: undefined,
        fromDate: requireDates?.fromDate,
        toDate: requireDates?.toDate,
      })
    },
    {
      select: (data: any) => {
        const userMonthLeave = data?.data?.data?.flatMap((leave: any) => {
          const unWindLeaves = leave?.leaveDates
            ?.filter((data: string) => monthIndex === parseInt(data?.split('-')?.[1]))
            ?.map((x: any) => ({
              id: leave?._id,
              isLeave: true,
              date: x?.split('T')?.[0],
              name: leave?.leaveType?.name,
              leaveName: leave?.leaveType?.name,
              halfDay: leave?.halfDay,
              sortNum: leave?.halfDay === 'first-half' ? 1 : 3,
            }))
          return unWindLeaves
        })
        return userMonthLeave
      },
      enabled: !isOffline,
    }
  )

  useRefreshOnFocus([attendanceRefetch, holidaysRefetch, leavesRefetch])

  useEffect(() => {
    const monthDates = getMonthDates(fromDate, toDate)
    setWeekendsDates(monthDates)
  }, [selectedYear, monthIndex])

  // merging all the leave, holidays, weekends and attendance data
  const attendanceDatas = [...(Attendances || []), ...(leavesData || []), ...(Holidays || [])]

  if (attendanceDatas && weekendsDate) {
    for (let i = 0; i < weekendsDate?.length; i++) {
      const isPresent = attendanceDatas.find((d) => d?.date === weekendsDate[i]?.date)
      if (!isPresent) {
        attendanceDatas.push(weekendsDate[i])
      }
    }
  }

  //sorting out for half day leave and punch in out
  const filteredAttendaceDates =
    attendanceDatas &&
    attendanceDatas
      .sort((a, b) => a.sortNum - b.sortNum)
      .sort((a: any, b: any) => moment(a?.date) - moment(b?.date))

  const finalFilteredDatas = filteredAttendaceDates?.map((d) => {
    if (d?.isWeekend) {
      const test = filteredAttendaceDates?.find((a) => a?.isWeekend && a?.date === d?.extraDay)
      return {
        ...d,
        isPrev: d?.day === SUNDAY && Boolean(test),
        isNext: d?.day === SATURDAY && Boolean(test),
      }
    }
    return d
  })

  const allInOneData = finalFilteredDatas.reduce((prev, curr) => {
    if (!prev[curr?.date]) {
      prev[curr?.date] = curr
    } else {
      prev[curr?.date] = {
        ...prev[curr?.date],
        ...curr,
        isSharingDates: true,
      }
    }
    return prev
  }, {})

  const handleDetailMulti = (item: any) => {
    if (item.isMultiple) {
      if (multiData?.id === item.id) {
        setMultiData(undefined)
        setIsMulti(false)
      } else {
        setMultiData(item)
        setIsMulti(true)
      }
    } else {
      navigation.navigate('AttendanceDetails', {
        fields: item,
        titles: [
          { name: 'date', title: 'Date' },
          { name: 'punchInTime', title: 'Punch-in Time' },
          { name: 'punchOutTime', title: 'Punch-out Time' },
          { name: 'punchTimeDifference', title: 'Office Hour' },
          { name: 'punchInNote', title: 'Punch-in Note' },
          { name: 'punchOutNote', title: 'Punch-out Note' },
        ],
      })
    }
  }

  const handleRenderItem = ({ item }: any) => {
    if (item?.day === SUNDAY && item?.isPrev) {
      return
    }

    const minimumHeight = item?.isSharingDates && item.hasOwnProperty('officeHours') ? 85 : 76
    return (
      <Pressable
        onPress={() => item?.officeHours && handleDetailMulti(item)}
        style={[
          {
            marginHorizontal: 12,
            ...styles.attendaceContainer,
            borderBottomColor: colors.attendanceTitleBorder,
            minHeight: item?.isSharingDates ? minimumHeight : item?.isWeekend ? 66 : 76,
          },
          (item?.isHoliday || item?.isLeave) &&
            !item?.isSharingDates && { justifyContent: 'center' },
        ]}
      >
        {item?.isSharingDates ? (
          <AttendanceSharing
            item={item}
            multiData={multiData}
            handleDetailMulti={handleDetailMulti}
          />
        ) : item.isWeekend ? (
          <AttendanceWeekend item={item} singleDate={!(item?.isNext || item?.isPrev)} />
        ) : item.isLeave || item.isHoliday ? (
          <AttendanceLeaveHoliday item={item} />
        ) : (
          <AttendanceData item={item} multiData={multiData} handleDetailMulti={handleDetailMulti} />
        )}
        <View>
          {item.isMultiple && isMulti && multiData?.id === item?.id && (
            <SubDatas item={item} handleDetailMulti={handleDetailMulti} />
          )}
        </View>
      </Pressable>
    )
  }

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onEnd((e) => {
      if (e.translationX < -30) {
        setMonthIndex((prev) => ((prev + 1) % 12 === 0 ? 12 : (prev + 1) % 12))
        carouselRef?.current?.scrollTo({
          count: 1,
          animated: true,
        })
      }
      if (e.translationX > 30) {
        setMonthIndex((prev) => (prev - 1 === 0 ? 12 : prev - 1))
        carouselRef?.current?.scrollTo({
          count: -1,
          animated: true,
        })
      }
    })

  return (
    <OfflineWrapper>
      <View style={{ ...styles.mainContainer, backgroundColor: colors.secondBackground }}>
        <View style={styles.dropdownStyles}>
          <MyText
            style={{ ...styles.dropdownText, color: colors.yearFilter }}
            hasCustomColor
            fontStyle={FONT_CONST.rubikRegular}
          >
            Filter by year:
          </MyText>
          <View>
            <Dropdown
              closeIcon={
                <Icon
                  name="smallCalendar"
                  height={15}
                  width={15}
                  fill={colors.calendarLiveTime}
                  isFill
                />
              }
              openIcon={
                <Icon
                  name="smallCalendar"
                  height={15}
                  width={15}
                  fill={colors.calendarLiveTime}
                  isFill
                />
              }
              value={selectedYear}
              open={open}
              setOpen={setOpen}
              items={officeDates}
              placeholder=""
              setValue={setSelectedYear}
              zIndex={1000}
              isMarginOutside
              styleLabel={{ color: colors.calendarLiveTime }}
              mainStyles={{
                borderRadius: 4,
                paddingHorizontal: 14,
                minHeight: 30,
              }}
              styles={{ width: 89 }}
              dropdownStyles={{ padding: 0 }}
            />
          </View>
        </View>
        <View style={{ marginTop: open ? -160 : 0 }}>
          <MonthCarousel indexs={monthIndex} setIndexs={setMonthIndex} carouselRef={carouselRef} />
          <AttendanceTitle />
          <View style={{ height: '78%' }}>
            <GestureDetector gesture={panGesture}>
              <FlatList
                data={Object.values(allInOneData)}
                keyExtractor={(item, index) => item?.date + index}
                renderItem={handleRenderItem}
                bounces={false}
                showsVerticalScrollIndicator={false}
              />
            </GestureDetector>
          </View>
        </View>
      </View>
    </OfflineWrapper>
  )
}

export default AttendanceCalendar

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 40 : 0,
  },
  dropdownStyles: {
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 50,
    marginTop: 25,
  },
  dropdownText: {
    marginRight: 10,
    marginTop: 11,
    fontSize: 12,
  },
  attendaceContainer: {
    borderBottomWidth: 1,
  },
  tableTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
  },
  tableText: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#424243',
    borderRightColor: '#a8aaad',
    width: '25%',
    fontSize: 13,
    padding: 7,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
})
