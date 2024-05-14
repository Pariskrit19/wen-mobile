import { StyleSheet } from 'react-native'
import React from 'react'
import SortedDetails from 'components/elements/SortedDetails'
import { getAllNotices } from 'services/noticeBoard'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import NotificationSkeleton from 'components/modules/notifications/NotificationSkeleton'

const NoticeBoardScreen = () => {
  const { data, isLoading, isError, isFetching } = useQuery(['notices'], () => getAllNotices({}), {
    keepPreviousData: true,
  })
  const currentDate = moment().format('YYYY-MM-DD')
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')

  const formattedNoticeDetails = data?.data?.data
    ?.map((notice) => ({
      id: notice._id,
      title: notice.title,
      date: notice.startDate,
      time: notice?.startTime?.split('T')?.[1],
      type: notice.noticeType.name,
      details: notice.details,
      endDate: notice.endDate,
      startTime: notice?.startTime ? new Date(notice?.startTime).toLocaleTimeString() : '_ _',
      endTime: notice?.endTime ? new Date(notice?.endTime).toLocaleTimeString() : '_ _',
      imageURL: notice?.image?.url,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  let today = moment()

  const eventsToday: any[] = []
  const eventsYesterday: any[] = []
  const eventsThisWeek: any[] = []
  const lastWeekEvents: any[] = []
  const pastEvents: any[] = []
  const futureEvents: any[] = []

  formattedNoticeDetails?.forEach((item: any) => {
    const momentDate = moment(item.date, 'YYYY-MM-DD')
    if (
      item.date.split('T')?.[0] === currentDate ||
      (new Date(item?.date) < new Date(currentDate) &&
        new Date(currentDate) <= new Date(item?.endDate))
    ) {
      eventsToday.push(item)
    } else if (today.diff(momentDate) < 0) {
      futureEvents.push(item)
    } else if (item.date.split('T')?.[0] === yesterday) {
      eventsYesterday.push(item)
    } else if (moment().week() === moment(item.date).week()) {
      eventsThisWeek.push(item)
    } else if (moment().week() - moment(item.date).week() === 1) {
      lastWeekEvents.push(item)
    } else {
      pastEvents.push(item)
    }
  })
  const DATA = [
    { title: 'TODAY', data: eventsToday },
    { title: 'UPCOMING', data: futureEvents },
    { title: 'YESTERDAY', data: eventsYesterday },
    { title: 'THIS WEEK', data: eventsThisWeek },
    { title: 'LAST WEEK', data: lastWeekEvents },
    { title: 'PAST', data: pastEvents },
  ]
  return isLoading ? (
    [0, 1, 2, 3, 4, 5, 6].map((card) => <NotificationSkeleton key={card} />)
  ) : (
    <SortedDetails data={DATA} />
  )
}

export default NoticeBoardScreen

const styles = StyleSheet.create({})
