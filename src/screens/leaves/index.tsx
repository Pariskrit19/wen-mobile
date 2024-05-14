import React, { useCallback } from 'react'
import { BackHandler, View } from 'react-native'
import LeaveDaysCount from 'components/modules/leaves/LeaveDaysCount'
import LeaveTabBar from 'components/modules/leaves/LeaveTabBar'
import ButtonEl from 'components/elements/Button'
import { CommonActions, NavigationProp, useFocusEffect, useTheme } from '@react-navigation/native'
import { DashboardRoutes, LeaveRoutes } from 'constants/routes'
import Icon from 'components/elements/Icon'
import { Easing } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import {
  getQuarters,
  getTakenAndRemainingLeaveDaysOfUser,
  getUserLeavesSummary,
} from 'services/leaves'
import moment from 'moment'
import { useAppSelector } from 'redux/hook'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import OfflineWrapper from 'components/modules/OfflineWrapper'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'

type Props = {
  navigation: NavigationProp<any, any>
}

const LeaveScreen = ({ navigation }: Props) => {
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const { colors } = useTheme()
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const leaveDaysQuery = useQuery(
    ['takenAndRemainingLeaveDays', authUser],
    () => getTakenAndRemainingLeaveDaysOfUser(authUser?._id),
    { enabled: !isOffline }
  )

  const {
    data: quarters,
    isSuccess,
    refetch,
  } = useQuery(['allquarters'], () => getQuarters(), { enabled: !isOffline })

  const leavesSummary = useQuery(
    ['leavesSummary'],
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

  useFocusEffect(
    useCallback(() => {
      const isLeaveFromNotification =
        navigation?.getState()?.routes?.[0]?.params?.isFromNotification

      const onBackPress: any = () => {
        if (isLeaveFromNotification) {
          navigation.setParams({ isFromNotification: false })
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: DashboardRoutes.Dashboard },
                {
                  name: DashboardRoutes.Notifications,
                },
              ],
            })
          )
          return true
        }
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [])
  )

  const yearlyLeavesTakn = leaveDaysQuery?.data?.data?.data?.reduce((acc, item) => {
    acc[item?._id] = item.leavesTaken
    return acc
  }, {})

  const sickLeaveRemainingDays = leavesSummary?.data?.data?.[0]?.remainingSickLeaves || 0
  const casualLeaveRemainingDays = leavesSummary?.data?.data?.[0]?.remainingCasualLeaves || 0
  const leavesUsed = yearlyLeavesTakn?.['Sick Leave'] || 0 + yearlyLeavesTakn?.['Casual Leave'] || 0
  const totalLeave = sickLeaveRemainingDays + casualLeaveRemainingDays + leavesUsed
  const totalRemainingDays = sickLeaveRemainingDays + casualLeaveRemainingDays
  const currentDate = moment()
  const currentQuarter = leavesSummary?.data?.data?.[0]?.leaves?.find((leave) => {
    return currentDate.isBetween(
      moment(leave?.quarter?.fromDate),
      moment(leave?.quarter?.toDate),
      'days',
      []
    )
  })

  useRefreshOnFocus([leaveDaysQuery?.refetch, leavesSummary?.refetch, refetch])

  return (
    <OfflineWrapper>
      <View style={{ flex: 1, backgroundColor: colors.secondBackground }}>
        {authUser?.status === 'Permanent' ? (
          <LeaveDaysCount
            casualLeaveRemainingDays={casualLeaveRemainingDays}
            sickLeaveRemainingDays={sickLeaveRemainingDays}
            yearlyLeavesTakn={yearlyLeavesTakn}
            currentQuarter={currentQuarter}
          />
        ) : (
          <View>
            <MyText
              fontStyle={FONT_CONST.rubikRegular}
              hasCustomColor
              style={{ color: '#15bef9', marginHorizontal: 15, marginTop: 10 }}
            >
              Note: You are allocated 1 day leave each month.
            </MyText>
          </View>
        )}
        <LeaveTabBar />
        <ButtonEl
          title="Add Leave"
          onPress={() => {
            navigation.navigate(LeaveRoutes.AddLeave)
          }}
          btnWidth={'35%'}
          btnHeight={40}
          fontSize={14}
          hasIcon
          iconToLeft
          btnTextBold
          btnTextColor="white"
          icon={<Icon name="Plus" width={24} height={24} color="white" />}
          styles={{ position: 'absolute', bottom: 40, right: 20, borderRadius: 20 }}
        />
      </View>
    </OfflineWrapper>
  )
}

export default LeaveScreen
