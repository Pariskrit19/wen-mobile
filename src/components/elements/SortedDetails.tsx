import { ActivityIndicator, SectionList, StyleSheet, View } from 'react-native'
import React from 'react'
import MyText from './MyText'
import NotificationCard from 'components/modules/notifications/Card'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query'
import NotFound from './NotFound'

const SortedDetails = ({
  data,
  showDelete = false,
  fetchNextPage,
  isFetching,
}: {
  data: any
  showDelete?: boolean
  fetchNextPage?: (options?: FetchNextPageOptions | undefined) => Promise<
    InfiniteQueryObserverResult<
      {
        res: {
          status: any
          message: any
          messageType: string
          data: any
        }
        pageNumber: any
      },
      unknown
    >
  >
  isFetching?: boolean
}) => {
  const { colors } = useTheme()
  return (
    <View style={styles.root}>
      <SectionList
        sections={data}
        initialNumToRender={20}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={<NotFound title="No any notification to show" />}
        onEndReached={() => {
          data?.length > 0 && !isFetching && fetchNextPage && fetchNextPage()
        }}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <NotificationCard
            id={item.id}
            title={item.title}
            date={item.date}
            endDate={item.endDate}
            type={item.type}
            startTime={item.startTime}
            endTime={item.endTime}
            image={item.imageURL}
            showDelete={showDelete}
            TypeIcon={item.CustomIcon || 'Notice'}
            typeColor={item.typeColor}
            typeTextColor={item.typeTextColor}
            details={item.details}
          />
        )}
        renderSectionHeader={({ section: { title, data } }) =>
          data?.length ? (
            <MyText
              style={{ ...styles.header, color: colors.leaveDaysTotalUsed }}
              hasCustomColor
              fontStyle={FONT_CONST.bold}
            >
              {title}
            </MyText>
          ) : null
        }
        ListFooterComponent={
          isFetching ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={{ marginBottom: 20 }}></View>
          )
        }
      />
    </View>
  )
}

export default SortedDetails

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    marginTop: 20,
    marginHorizontal: 12,
  },
  backup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginVertical: 15,
  },
})
