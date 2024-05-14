import { StyleSheet } from 'react-native'
import React from 'react'
import HorizontalContainer from 'components/elements/HorizontalContainer'
import LeaveWidget from 'components/elements/pressables/LeavesOverview'
import { getFutureLeaves } from 'services/dashboard'
import { useQuery } from '@tanstack/react-query'
import { getLeaveDayFormat, getLeaveDuration } from 'utils'
import { getTodayLeaves } from 'services/leaves'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import { useAppSelector } from 'redux/hook'

const CoWorkersOnLeave = () => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const leavesQuery = useQuery(['DashBoardleaves'], () => getTodayLeaves(), {
    onError: (err) => console.log(err),
    enabled: !isOffline,
  })

  useRefreshOnFocus([leavesQuery?.refetch])
  const formattedLeaveData = leavesQuery?.data?.data?.users?.map((user) => {
    return {
      id: Math.random(),
      title: user.user?.[0]?.name,
      date: getLeaveDayFormat(new Date().toISOString()),
      duration: getLeaveDuration(user.halfDay),
      profile: user?.user?.[0]?.photoURL,
      name: user?.leaveType[0]?.name,
    }
  })

  return (
    <HorizontalContainer
      title="Co-workers on Leave"
      CustomPressable={LeaveWidget}
      data={formattedLeaveData}
      iconName="coworkerOnLeave"
      backupText="No Coworker on Leave Today."
      iconHeight="16"
      containerStyle={{ paddingTop: 16 }}
    />
  )
}

export default CoWorkersOnLeave

const styles = StyleSheet.create({})
