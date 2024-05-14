import { StyleSheet } from 'react-native'
import React from 'react'
import HorizontalContainer from 'components/elements/HorizontalContainer'
import HolidayWidget from 'components/elements/pressables/Holidays'
import { getAllHolidays } from 'services/dashboard'
import { useQuery } from '@tanstack/react-query'
import { MuiFormatDate, intervalBetweenDays } from 'utils'
import moment from 'moment'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import { useAppSelector } from 'redux/hook'

const Holidays = () => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const { data: Holidays, refetch } = useQuery(
    ['DashBoardHolidays'],
    () => getAllHolidays({ sort: '-createdAt', limit: '1' }),
    {
      enabled: !isOffline,
    }
  )

  useRefreshOnFocus([refetch])

  const holidaysList: any[] = []
  const extractedHolidays = Holidays?.data?.data?.map((holidayObj) => holidayObj.holidays)

  extractedHolidays?.forEach((holiday) => {
    holiday?.forEach((day) => holidaysList.push(day))
  })

  const weeklyHolidays = holidaysList?.filter(
    (holiday) =>
      intervalBetweenDays(moment(), holiday?.date) >= 0 &&
      intervalBetweenDays(moment(), holiday?.date) < 8
  )
  const formattedHolidays = weeklyHolidays?.map((holiday) => ({
    id: holiday._id,
    title: holiday.title,
    date: holiday.date,
  }))

  return (
    <HorizontalContainer
      title="Holidays"
      iconName="holidayIcon"
      data={formattedHolidays}
      CustomPressable={HolidayWidget}
      backupText="No holidays this week."
      iconHeight="18"
      containerStyle={{ paddingTop: 18 }}
    />
  )
}

export default Holidays

const styles = StyleSheet.create({})
