import { FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import ButtonEl from 'components/elements/Button'
import { ProjectLogRoutes } from 'constants/routes'
import Icon from 'components/elements/Icon'
import { useQuery } from '@tanstack/react-query'
import { getAllTimeLogs } from 'services/projectLogs'
import { changeDate } from 'helpers/utils'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import { FONT_CONST } from 'helpers/constants'
import LogtimesSkeleton from 'components/modules/logtimes/LogtimesSkeleton'
import { useRefresh } from 'hooks/useRefresh'
import NotFound from 'components/elements/NotFound'
import { useAppSelector } from 'redux/hook'
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
interface Props {
  route: any
}

const ProjectLogsScreen = ({ route }: any) => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const navigation: NavigationProp<any, any> = useNavigation()
  const { refreshing, onRefresh } = useRefresh({ keysToRevalidate: ['timeLogs'] })
  const { colors } = useTheme()

  const datas = route.params.item
  const projectId = datas?._id
  const {
    data: LogTimeData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    ['timeLogs', projectId],
    () =>
      getAllTimeLogs({
        project: projectId,
      }),
    { keepPreviousData: true, enabled: !isOffline }
  )

  const memoRefetch = useMemo(() => [refetch], [refetch])
  useRefreshOnFocus(memoRefetch)

  const handleRenderItem = ({ item }) => {
    return (
      <Pressable
        style={[styles.renderItem, { backgroundColor: colors.lighterBackground }]}
        onPress={() => {
          navigation.navigate(ProjectLogRoutes.LogDetails, {
            item: { ...item, name: datas?.name, showProject: false },
          })
        }}
      >
        <View style={styles.detailProject}>
          <View style={styles.sameWidth}>
            <MyText
              style={{ ...styles.title, color: colors.projectListTitleField }}
              hasCustomColor
              fontStyle={FONT_CONST.rubikMedium}
            >
              Date:
            </MyText>
            <MyText hasCustomColor style={{ ...styles.value, color: colors.projectListValueField }}>
              {changeDate(item?.logDate)}
            </MyText>
          </View>
          <View style={styles.sameWidth}>
            <MyText
              style={{ ...styles.title, color: colors.projectListTitleField }}
              hasCustomColor
              fontStyle={FONT_CONST.rubikMedium}
            >
              Log Type:
            </MyText>
            <MyText hasCustomColor style={{ ...styles.value, color: colors.projectListValueField }}>
              {item?.logType?.name}
            </MyText>
          </View>
          <View style={styles.sameWidth}>
            <MyText
              style={{ ...styles.title, color: colors.projectListTitleField }}
              hasCustomColor
              fontStyle={FONT_CONST.rubikMedium}
            >
              Added By:
            </MyText>
            <MyText
              hasCustomColor
              style={{ ...styles.value, color: colors.projectListValueField, width: '50%' }}
              numberOfLines={1}
            >
              {item?.user?.name}
            </MyText>
          </View>
        </View>
      </Pressable>
    )
  }
  return (
    <OfflineWrapper>
      <View style={styles.main}>
        <MyText
          style={{ ...styles.renderTitle, color: colors.projectListTitle }}
          hasCustomColor
          fontStyle={FONT_CONST.bold}
        >
          {datas?.name}
        </MyText>
        {isLoading && !isOffline ? (
          [0, 1, 2, 3, 4, 5, 6].map((card) => <LogtimesSkeleton key={card} />)
        ) : (
          <FlatList
            data={LogTimeData?.data?.data}
            extraData={Math.random()}
            keyExtractor={(item: any, index: number) => item?.id + index}
            renderItem={handleRenderItem}
            showsHorizontalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={
              <NotFound title={'No Logs Have Been Added!'} style={{ marginHorizontal: 10 }} />
            }
          />
        )}
        <ButtonEl
          title="Add Log"
          onPress={() => {
            navigation.navigate(ProjectLogRoutes.AddLog, {
              showProject: false,
              projectId,
              logsProject: datas?.name,
            })
          }}
          btnWidth="33%"
          btnHeight={40}
          hasIcon
          iconToLeft
          btnTextBold
          btnTextColor="white"
          icon={<Icon name="Plus" width={24} height={24} color="white" />}
          styles={{ position: 'absolute', bottom: 20, right: 20, borderRadius: 20 }}
        />
      </View>
    </OfflineWrapper>
  )
}

export default ProjectLogsScreen

const styles = StyleSheet.create({
  main: {
    marginVertical: 12,
    flex: 1,
  },
  renderItem: {
    padding: 12,
    paddingBottom: 0,
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 5,
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
    fontSize: 20,
    color: '#4363c6',
    marginBottom: 10,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  sameWidth: {
    width: '50%',
    flexDirection: 'row',
    marginTop: 5,
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
})
