import { useFocusEffect, useTheme } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import NotFound from 'components/elements/NotFound'
import ListSection from 'components/modules/leaves/ListSection'
import { leaveTypeData } from 'helpers/utils'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { useAppSelector } from 'redux/hook'

type Props = {}

const CasualLeave = (props: Props) => {
  const { colors } = useTheme()
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const queryClient = useQueryClient()
  const [casualListData, setCasualListData] = useState([])

  const userLeaveCache = queryClient.getQueryData(['userLeaves', authUser?._id])

  useFocusEffect(
    useCallback(() => {
      const finalData = leaveTypeData(userLeaveCache?.data?.data, 'Casual Leave')
      setCasualListData(finalData)
    }, [userLeaveCache])
  )

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 25,
        backgroundColor: colors.secondBackground,
      }}
    >
      {casualListData?.length ? (
        <ListSection list={casualListData} />
      ) : (
        <NotFound title=" No Leaves Taken" />
      )}
    </View>
  )
}

export default CasualLeave
