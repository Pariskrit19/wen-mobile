import { NavigationProp, useTheme } from '@react-navigation/native'
import LeaveBalance from 'components/modules/leaves/myLeaves/LeaveBalance'
import LeaveBarScreen from 'components/modules/leaves/myLeaves/LeaveBarScreen'
import LeavesUsed from 'components/modules/leaves/myLeaves/LeavesUsed'
import ButtonEl from 'components/elements/Button'
import { LeaveRoutes } from 'constants/routes'
import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import {
  getQuarters,
  getTakenAndRemainingLeaveDaysOfUser,
  getUserLeavesSummary,
} from 'services/leaves'
import { useAppSelector } from 'redux/hook'
import OfflineWrapper from 'components/modules/OfflineWrapper'

type Props = {
  navigation: NavigationProp<any, any>
}

const MyLeaves = ({ navigation }: Props) => {
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const { colors } = useTheme()
  const handleRequest = () => {
    navigation.navigate(LeaveRoutes.AddLeave)
  }

  const leaveDaysQuery = useQuery(
    ['takenAndRemainingLeaveDays', authUser?._id],
    () => getTakenAndRemainingLeaveDaysOfUser(authUser?._id),
    {
      enabled: !isOffline,
    }
  )

  const { data: quarters, isSuccess } = useQuery(['allquarters'], () => getQuarters(), {
    enabled: !isOffline,
  })

  const leavesSummary = useQuery(
    ['leavesSummary', authUser?._id],
    () => {
      //getting the quarterId
      const currentQuarter = quarters?.data?.data[0]?.quarters.find(
        (d) =>
          new Date(d?.fromDate) <= new Date().setUTCHours(0, 0, 0, 0) &&
          new Date().setUTCHours(23, 59, 59, 999) <= new Date(d?.toDate)
      )
      return getUserLeavesSummary({
        userId: authUser?._id,
        quarterId: currentQuarter?._id,
        fiscalYear: quarters?.data?.data[0]?.fiscalYear,
      })
    },
    { enabled: isSuccess && !isOffline }
  )

  const yearlyLeavesTakn = leaveDaysQuery?.data?.data?.data?.reduce((acc, item) => {
    acc[item?._id] = item.leavesTaken
    return acc
  }, {})

  const sickLeaveRemainingDays = leavesSummary?.data?.data?.[0]?.remainingSickLeaves
  const casualLeaveRemainingDays = leavesSummary?.data?.data?.[0]?.remainingCasualLeaves
  const leavesUsed =
    (yearlyLeavesTakn?.['Sick Leave'] || 0) + (yearlyLeavesTakn?.['Casual Leave'] || 0)
  const totalLeave = sickLeaveRemainingDays + casualLeaveRemainingDays + leavesUsed || 0
  const totalRemainingDays = sickLeaveRemainingDays + casualLeaveRemainingDays || 0

  return (
    <OfflineWrapper>
      <View style={{ flex: 1, backgroundColor: colors.secondBackground }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LeaveBalance totalLeave={totalLeave} totalRemainingDays={totalRemainingDays} />
          <LeavesUsed totalLeave={totalLeave} leavesUsed={leavesUsed} />
          <LeaveBarScreen
            yearlyLeavesTakn={yearlyLeavesTakn}
            casualLeaveRemainingDays={casualLeaveRemainingDays}
            sickLeaveRemainingDays={sickLeaveRemainingDays}
          />
          <View style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 30 }}>
            <ButtonEl
              title="REQUEST A LEAVE"
              onPress={handleRequest}
              btnTextColor="white"
              btnTextBold
            />
          </View>
        </ScrollView>
      </View>
    </OfflineWrapper>
  )
}

export default MyLeaves

const styles = StyleSheet.create({})
