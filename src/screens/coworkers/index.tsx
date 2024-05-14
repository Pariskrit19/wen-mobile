import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native'
import TextInputEl from 'components/elements/form/TextInput'
import Icon from 'components/elements/Icon'
import CoWorker from 'components/elements/pressables/CoWorker'
import { useTheme } from '@react-navigation/native'
import { getAllUsers } from 'services/users'
import { getDateFromMoment, getTimeFromMoment } from 'utils'
import CoworkerSkeleton from 'components/modules/coworkers/CoworkerSkeleton'
import { usePagination } from 'hooks/usePagination'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import NotFound from 'components/elements/NotFound'
import { useAppSelector } from 'redux/hook'
import OfflineWrapper from 'components/modules/OfflineWrapper'
import { debounce } from 'helpers/utils'

export interface CoWorkerData {
  id: string
  name: string
  position: string
  profile: string
  role: string
  officeStartTime: string
  officeEndTime: string
  status: string
  allocatedLeaves: string
  lastReviewDate: string
  joinedDate: string
  exitDate: string
  contact: string
  username: string
}

const CoWorkersScreen = () => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const [searchedQuery, setSearchedQuery] = useState('')
  const [tempSearchQuery, setTempSearchQuery] = useState('')
  const { colors } = useTheme()
  const {
    data: coWorkers,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    refetch,
  }: any = usePagination(
    ['users', tempSearchQuery],
    async (pageParam: number) =>
      await getAllUsers({
        page: pageParam,
        sort: 'name',
        limit: 10,
        fields: '',
        name: tempSearchQuery,
        role: '',
        position: '',
        positionType: '',
        active: 'true',
      }),
    (data: any) => {
      const transformedData = data?.pages
        ?.map((page: any) => [
          ...page?.res?.data?.data?.map((coworker: any) => ({
            id: coworker?._id,
            name: coworker?.name,
            position: coworker?.position?.name,
            profile: coworker?.photoURL,
            role: coworker?.role?.value,
            officeStartTime: new Date(coworker?.officeTime?.utcDate).toLocaleTimeString(),
            officeEndTime: new Date(coworker?.officeEndTime).toLocaleTimeString(),
            status: coworker?.status,
            lastReviewDate: getDateFromMoment(coworker?.lastReviewDate[0]),
            joinedDate: getDateFromMoment(coworker?.joinDate),
            exitDate: getDateFromMoment(coworker?.exitDate) ?? '-',
            username: coworker?.username,
            primaryPhone: coworker?.primaryPhone,
          })),
        ])
        .flat()

      return transformedData
    },
    isOffline
  )

  const memoRefetch = useMemo(() => [refetch], [refetch])

  useRefreshOnFocus(memoRefetch)

  const searchHandler = (text: string) => {
    if (text?.length !== 1 || tempSearchQuery?.length >= text?.length) {
      setTempSearchQuery(text)
    }
  }

  const optimizedFn = useCallback(debounce(searchHandler, 500), [tempSearchQuery])

  const backupView = <NotFound hasSearch style={{ marginHorizontal: 14 }} />

  return (
    <OfflineWrapper>
      <View style={styles.main}>
        <View style={{ paddingHorizontal: 12 }}>
          <TextInputEl
            placeholder="Search Co-worker..."
            iconToRight={true}
            rightIcon={
              <Pressable
                onPress={() => {
                  if (tempSearchQuery.length) {
                    setSearchedQuery('')
                    setTempSearchQuery('')
                  }
                }}
              >
                <Icon
                  width={20}
                  height={18}
                  name={searchedQuery ? 'close' : 'search'}
                  isFill={!!searchedQuery}
                  fill={colors.semiIconColor}
                  isStroke
                  stroke={colors.semiIconColor}
                />
              </Pressable>
            }
            value={searchedQuery}
            onChangeText={(text) => {
              setSearchedQuery(text)
              optimizedFn(text)
            }}
            styles={styles.inputStyles}
            viewStyles={{
              ...styles.customInputStyles,
              backgroundColor: colors.semiCardBackground,
            }}
          />
        </View>

        {isLoading && !isOffline ? (
          [0, 1, 2, 3, 4, 5, 6].map((card) => <CoworkerSkeleton key={card} />)
        ) : !coWorkers || coWorkers.length === 0 ? (
          backupView
        ) : (
          <View style={{ marginBottom: 10 }}>
            <FlatList
              data={coWorkers}
              keyExtractor={(item) => item.id}
              renderItem={(itemData) => <CoWorker item={itemData.item} />}
              style={{ height: '86%' }}
              onEndReachedThreshold={0.3}
              onEndReached={() => {
                !isFetchingNextPage && fetchNextPage()
              }}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                  </View>
                ) : (
                  <View style={{ marginBottom: 20 }}></View>
                )
              }
            />
          </View>
        )}

        {/* {!formattedCoWorkers || (formattedCoWorkers?.length < 1 && backupView)} */}
      </View>
    </OfflineWrapper>
  )
}

export default CoWorkersScreen

const styles = StyleSheet.create({
  main: {
    // paddingHorizontal: 12,
  },
  customInputStyles: {
    paddingVertical: 4,
    fontSize: 14,
    paddingLeft: 20,
    width: '100%',
    borderRadius: 5,
    marginVertical: 15,
    marginTop: 20,
  },
  inputStyles: {
    borderRadius: 44,
  },
  notFound: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginVertical: 15,
  },
})
