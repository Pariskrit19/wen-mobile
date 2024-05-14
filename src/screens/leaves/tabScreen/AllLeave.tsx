import { useTheme } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import NotFound from 'components/elements/NotFound'
import LeavesSkeleton from 'components/modules/leaves/LeavesSkeleton'
import ListSection from 'components/modules/leaves/ListSection'
import { getleaveDataFormater } from 'helpers/utils'
import { useRefresh } from 'hooks/useRefresh'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import React from 'react'
import { View } from 'react-native'
import { useAppSelector } from 'redux/hook'
import { getLeavesOfUser } from 'services/leaves'

type Props = {}

const AllLeave = (props: Props) => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const { colors } = useTheme()
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const { refreshing, onRefresh } = useRefresh({ keysToRevalidate: ['userLeaves'] })

  const { data, isLoading, refetch } = useQuery(
    ['userLeaves', authUser?._id],
    () =>
      getLeavesOfUser({
        id: authUser?._id,
      }),
    {
      select: (res) => {
        return getleaveDataFormater(res?.data?.data)
      },
      enabled: !isOffline,
    }
  )

  useRefreshOnFocus([refetch])

  if (isLoading && !isOffline)
    return [0, 1, 2, 3, 4, 5, 6].map((leave) => (
      <View
        style={{
          marginHorizontal: 20,
        }}
        key={leave}
      >
        <LeavesSkeleton key={leave} />
      </View>
    ))

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 25,
        backgroundColor: colors.secondBackground,
      }}
    >
      <ListSection
        list={data || []}
        refreshing={refreshing}
        onRefresh={onRefresh}
        EmptyComponent={<NotFound title=" No Leaves Taken" />}
      />
    </View>
  )
}

export default AllLeave
