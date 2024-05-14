import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useMemo } from 'react'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import ButtonEl from 'components/elements/Button'
import { LogtimeRoutes } from 'constants/routes'
import Icon from 'components/elements/Icon'
import LogtimesSkeleton from 'components/modules/logtimes/LogtimesSkeleton'
import { FONT_CONST } from 'helpers/constants'
import ProjectLabelValue from 'components/modules/projects/ProjectLabelValue'
import { changeDate, sortTableDatas } from 'helpers/utils'
import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from 'redux/hook'
import { getWeeklyTimeLogs } from 'services/projectLogs'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import { RefreshControl } from 'react-native-gesture-handler'
import { useRefresh } from 'hooks/useRefresh'
import NotFound from 'components/elements/NotFound'
import OfflineWrapper from 'components/modules/OfflineWrapper'

interface LogTimeProps {
  id: number
  name: string
  date: string
  logType: string
  hours: number
  minutes: number
  remarks: string
  addedBy: string
}

const LogTimeScreen = () => {
  const navigation: NavigationProp<any, any> = useNavigation()
  const [page, setPage] = useState({ page: 1, limit: 50 })
  const [sort, setSort] = useState({})
  const { refreshing, onRefresh } = useRefresh({ keysToRevalidate: ['UsertimeLogs'] })
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const {
    data: logTimeDetails,
    isLoading: timelogLoading,
    isFetching: timeLogFetching,
    refetch: logRefetch,
  } = useQuery(
    ['UsertimeLogs', page, authUser?._id, sort],
    () =>
      getWeeklyTimeLogs({
        ...page,
        user: authUser?._id,
        sort: sortTableDatas(sort?.order, sort?.column, sort?.field),
      }),
    { keepPreviousData: true, enabled: !isOffline }
  )

  const memoRefetch = useMemo(() => [logRefetch], [logRefetch])

  useRefreshOnFocus(memoRefetch)

  const { colors } = useTheme()

  const handleRenderItem = ({ item }: any) => {
    return (
      <Pressable
        style={[styles.renderItem, { backgroundColor: colors.headerBackground }]}
        onPress={() => {
          navigation.navigate(LogtimeRoutes.LogDetails, { item: { ...item, showProject: true } })
        }}
      >
        <MyText
          style={{ ...styles.renderTitle, color: colors.projectListTitle }}
          hasCustomColor
          fontStyle={FONT_CONST.bold}
        >
          {item?.project?.name || 'Other'}
        </MyText>
        <View style={styles.detailProject}>
          <View style={styles.sameWidth}>
            <ProjectLabelValue
              label="Date"
              value={changeDate(item?.logDate)}
              labelStyle={{ fontSize: 12 }}
            />
          </View>
          <View style={styles.sameWidth}>
            <ProjectLabelValue
              label="Log Type"
              value={item?.logType?.name}
              labelStyle={{ fontSize: 12 }}
            />
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <OfflineWrapper>
      <View style={styles.main}>
        {timelogLoading && !isOffline ? (
          [0, 1, 2, 3, 4, 5, 6].map((card) => <LogtimesSkeleton key={card} />)
        ) : (
          <FlatList
            data={logTimeDetails?.data?.data}
            extraData={(item: any) => item?.id}
            keyExtractor={(item: any) => item?.id}
            renderItem={handleRenderItem}
            showsHorizontalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={
              <NotFound title={'No Logs Have Been Added!'} style={{ marginHorizontal: 10 }} />
            }
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ marginBottom: 70 }}
          />
        )}

        <ButtonEl
          title="Add Log"
          onPress={() => {
            navigation.navigate(LogtimeRoutes.AddLog, { showProject: true })
          }}
          btnWidth="33%"
          btnHeight={40}
          hasIcon
          iconToLeft
          btnTextBold
          btnTextColor="white"
          icon={<Icon name="Plus" width={24} height={24} color="white" />}
          styles={{ position: 'absolute', bottom: 20, right: 14, borderRadius: 20 }}
        />
      </View>
    </OfflineWrapper>
  )
}

export default LogTimeScreen

const styles = StyleSheet.create({
  main: {
    marginTop: 11,
    marginBottom: 16,
    flex: 1,
  },
  renderItem: {
    padding: 12,
    paddingBottom: 0,
    backgroundColor: 'white',
    marginBottom: 5,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 5,
    marginTop: 5,
    shadowRadius: 8,
    shadowColor: 'rgba(0,0,0,0.3)',
  },
  renderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  renderTopText: {
    backgroundColor: '#c1f6ff',
    color: '#11aec9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
    fontSize: 12,
    borderRadius: 5,
  },
  renderTitle: {
    fontSize: 17,
    marginBottom: 5,
    lineHeight: 24,
  },
  sameWidth: {
    width: '50%',
    flexDirection: 'row',
    marginTop: 10,
  },
  value: {
    marginLeft: 5,
    fontSize: 11,
    alignSelf: 'center',
    color: 'rgba(96, 96, 96, 0.8)',
  },
  title: {
    color: '#424243',
    fontWeight: '500',
    fontSize: 11,
  },

  detailProject: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  notFound: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
