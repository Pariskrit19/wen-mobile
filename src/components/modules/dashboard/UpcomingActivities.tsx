import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import ImageAndDetails from 'components/elements/pressables/ImageAndDetails'
import HorizontalContainer from 'components/elements/HorizontalContainer'
import MyText from 'components/elements/MyText'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { DashboardRoutes } from 'constants/routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Colors } from 'constants/colors'
import { getWeeklyNotices } from 'services/dashboard'
import { useQuery } from '@tanstack/react-query'
import { differenceInDays } from 'utils'
import moment from 'moment'
import { FONT_CONST } from 'helpers/constants'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import { useAppSelector } from 'redux/hook'

const UpcomingActiviites = () => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { data: notices, refetch } = useQuery(['DashBoardnotices'], getWeeklyNotices, {
    enabled: !isOffline,
  })

  useRefreshOnFocus([refetch])

  const formattedNotices = notices?.data?.notices
    ?.map((notice) => ({
      id: notice?._id,
      title: notice?.title,
      date: notice?.startDate,
      endDate: notice?.endDate,
      image: notice?.image?.url,
      remaining: differenceInDays(moment(), notice?.startDate, true),
      type: notice?.noticeType?.name,
      time: notice?.startTime ? new Date(notice?.startTime).toLocaleTimeString() : undefined,
      endtime: notice?.endTime ? new Date(notice?.endTime).toLocaleTimeString() : undefined,
      details: notice?.details,
    }))
    .sort((a: any, b: any) => new Date(a?.date) - new Date(b?.date))

  const ShowAll = (
    <Pressable
      onPress={() => navigation.navigate(DashboardRoutes.NoticeBoard)}
      style={styles.buttonSize}
    >
      <MyText style={styles.noticeLink} hasCustomColor fontStyle={FONT_CONST.rubikRegular}>
        {formattedNotices?.length > 0 ? 'Show All' : ' Show All(Past)'}
      </MyText>
    </Pressable>
  )
  return (
    <HorizontalContainer
      title="Upcoming Activities"
      iconName="upcomingActivities"
      CustomPressable={ImageAndDetails}
      data={formattedNotices}
      options={ShowAll}
      backupText="No activities this week."
      iconHeight="17"
      containerStyle={{ paddingTop: 16 }}
    />
  )
}

export default UpcomingActiviites

const styles = StyleSheet.create({
  noticeLink: {
    textDecorationLine: 'underline',
    color: Colors.wenBlue,
    marginRight: 12,
    fontWeight: '400',
    fontSize: 12,
  },
  buttonSize: {
    marginVertical: -5,
    paddingVertical: 5,
    paddingLeft: 10,
  },
})
