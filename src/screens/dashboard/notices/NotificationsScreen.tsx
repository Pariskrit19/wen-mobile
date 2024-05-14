import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SortedDetails from 'components/elements/SortedDetails'

import { getNotifications } from 'services/notifications'
import NotificationSkeleton from 'components/modules/notifications/NotificationSkeleton'
import { useAppSelector } from 'redux/hook'
import { usePagination } from 'hooks/usePagination'
import moment from 'moment'
import { socket } from '../../../../App'
import { DashboardRoutes, LeaveRoutes } from 'constants/routes'
interface DetailsProp {
  id: string
  title: string
  date: string
  time: string
  type: string
  image?: string
  details?: string
  CustomIcon?: string
  typeColor?: string
  typeTextColor?: string
}

const changeNotificationDataStructure = (data: any) => {
  const formattedNotifications = data?.pages
    ?.map((page) => [
      ...page.res?.data?.data?.map((notification) => ({
        id: notification._id,
        title: notification.remarks,
        date: notification?.createdAt,
        startTime: new Date(notification.createdAt).toLocaleTimeString(),
        endTime: new Date(notification.createdAt).toLocaleTimeString(),
        type: notification.module,
      })),
    ])
    .flat()
  // data is empty
  if (formattedNotifications.length === 0) return []

  const currentDate = moment().format('YYYY-MM-DD')
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
  const sortedData = formattedNotifications?.sort((a, b) => moment(b.date).diff(moment(a.date)))
  const customizedData = sortedData?.map((item) => {
    if (item.type === 'Leave' || item.type === 'Logtime' || item.type === 'Attendance') {
      return {
        ...item,
        CustomIcon: 'LeaveNotify',
        typeColor: '#E6ECFF',
        typeTextColor: '#4E63C6',
      }
    }
    if (item.type === 'Notice') {
      return {
        ...item,
        CustomIcon: 'Notice',
        typeColor: '#E6ECFF',
        typeTextColor: '#4E63C6',
      }
    }
    if (item.type === 'Announcements') {
      return {
        ...item,
        CustomIcon: 'Notice',
        typeColor: '#E6ECFF',
        typeTextColor: '#4E63C6',
      }
    }
    if (item.type === 'Refreshment') {
      return {
        ...item,
        CustomIcon: 'Notice',
        typeColor: 'rgba(247, 79, 117, 0.35)',
        typeTextColor: '#F74F75',
      }
    }
    if (item.type === 'Blog') {
      return {
        ...item,
        CustomIcon: 'Blog',
        typeColor: '#E6ECFF',
        typeTextColor: '#4E63C6',
      }
    }
    if (item.type === 'Event') {
      return {
        ...item,
        CustomIcon: 'Event',
        typeColor: '#E6ECFF',
        typeTextColor: '#606060',
      }
    } else return item
  })

  let today = moment()

  const eventsToday: DetailsProp[] = []
  const eventsYesterday: DetailsProp[] = []
  const eventsThisWeek: DetailsProp[] = []
  const lastWeekEvents: DetailsProp[] = []
  const pastEvents: DetailsProp[] = []
  const futureEvents: DetailsProp[] = []

  customizedData?.forEach((item: any) => {
    const momentDate = moment(item.date, 'YYYY-MM-DD')
    if (item.date.split('T')?.[0] === currentDate) {
      eventsToday.push(item)
    } else if (item.date.split('T')?.[0] === yesterday) {
      eventsYesterday.push(item)
    } else if (today.diff(momentDate) < 0) {
      futureEvents.push(item)
    } else if (moment().week() === moment(item.date).week()) {
      eventsThisWeek.push(item)
    } else if (moment().week() - moment(item.date).week() === 1) {
      lastWeekEvents.push(item)
    } else {
      pastEvents.push(item)
    }
  })
  const DATA = [
    { title: 'UPCOMING', data: futureEvents },
    { title: 'TODAY', data: eventsToday },
    { title: 'YESTERDAY', data: eventsYesterday },
    { title: 'THIS WEEK', data: eventsThisWeek },
    { title: 'LAST WEEK', data: lastWeekEvents },
    { title: 'PAST', data: pastEvents },
  ]
  return DATA
}

const NotificationsScreen = () => {
  const {
    authUser: {
      _id,
      joinDate,
      role: { key },
    },
  } = useAppSelector((state) => state.auth)
  const { data, isFetchingNextPage, fetchNextPage, isLoading, isFetching } = usePagination(
    ['notificationInfo'],
    async (pageParam: number) =>
      await getNotifications({
        page: pageParam,
        limit: 10,
        userId: _id,
        joinDate: joinDate,
        role: key,
      }),
    (data: any) => changeNotificationDataStructure(data)
  )

  useEffect(
    () => {
      const fetchNotifications = async () => {
        socket.emit('viewed-notification', { _id, key })
      }

      fetchNotifications()
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_id, key]
  )

  return isLoading ? (
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 10].map((card) => <NotificationSkeleton key={card} />)
  ) : (
    <SortedDetails
      data={data && data?.length > 0 ? data : []}
      showDelete={true}
      fetchNextPage={fetchNextPage}
      isFetching={isFetchingNextPage || isFetching}
    />
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({})
