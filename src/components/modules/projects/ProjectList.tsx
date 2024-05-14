import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { Colors } from 'constants/colors'
import { ProjectLogRoutes, ProjectRoutes } from 'constants/routes'
import { FONT_CONST } from 'helpers/constants'
import { changeDate } from 'helpers/utils'
import React from 'react'
import { FlatList, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import ProjectLabelValue from './ProjectLabelValue'
import { useAppSelector } from 'redux/hook'
import { RefreshControl } from 'react-native-gesture-handler'
import NotFound from 'components/elements/NotFound'

const ProjectList = ({
  projectDatas,
  handleScroll,
  isFetchingNextPage,
  fetchNextPage,
  refreshing,
  onRefresh,
  isFilterPresent,
  handleFilterReset,
}: any) => {
  const navigation: NavigationProp<any, any> = useNavigation()
  const { colors } = useTheme()
  const darkMode = useAppSelector((state) => state.appTheme.darkMode)
  const isOffline = useAppSelector((state) => state.common.isOffline)

  const handleRenderItem = ({ item }: any) => {
    const isClientEmpty = !item?.client?.name

    const projectNameComponent = (
      <MyText
        style={{
          ...styles.renderTitle,
          maxWidth: '90%',
          color: colors.projectListTitle,
          marginTop: isClientEmpty ? -5 : 5,
          marginHorizontal: isClientEmpty ? 0 : 10,
        }}
        hasCustomColor
        fontStyle={FONT_CONST.bold}
        numberOfLines={1}
      >
        {item?.name}
      </MyText>
    )

    return (
      <Pressable onPress={() => navigation.navigate(ProjectRoutes.ProjectDetails, { item })}>
        <View
          style={[
            styles.renderItem,
            {
              backgroundColor: colors.headerBackground,
              elevation: darkMode ? 0 : 3,
              marginHorizontal: 3,
            },
          ]}
        >
          <View style={[styles.renderTop, styles.insideMargin]}>
            {isClientEmpty ? (
              projectNameComponent
            ) : (
              <View
                style={{
                  backgroundColor: darkMode ? '#05A9C5' : '#c1f6ff',
                  paddingHorizontal: 11,
                  paddingVertical: 3,
                  alignSelf: 'center',
                  borderRadius: 4,
                  maxWidth: '80%',
                }}
              >
                <MyText
                  style={{
                    color: darkMode ? '#fff' : '#11aec9',
                    fontSize: 10,
                    lineHeight: 11.5,
                  }}
                  hasCustomColor
                  fontStyle={FONT_CONST.rubikRegular}
                  numberOfLines={1}
                >
                  {item?.client?.name}
                </MyText>
              </View>
            )}
            <Pressable
              onPress={() => navigation.navigate(ProjectLogRoutes.Logtimes, { item })}
              style={styles.logbuttonStyle}
            >
              <MyText
                style={{
                  ...styles.logtimeStyle,
                  color: Colors.wenBlue,
                }}
                hasCustomColor
                fontStyle={FONT_CONST.rubikMedium}
              >
                Log Time
              </MyText>
            </Pressable>
          </View>
          {isClientEmpty ? null : projectNameComponent}
          <View
            style={{
              ...styles.detailProject,
              ...styles.insideMargin,
              marginVertical: 10,
            }}
          >
            <ProjectLabelValue
              style={{ ...styles.leftSideTitle }}
              label="Start Date"
              value={changeDate(item?.startDate)}
            />
            <ProjectLabelValue
              style={styles.sameWidth}
              label="End Date"
              value={item?.endDate ? changeDate(item?.startDate) : 'N/A'}
            />
          </View>
          <View
            style={{
              ...styles.detailProject,
              ...styles.insideMargin,
              marginBottom: 15,
            }}
          >
            <ProjectLabelValue
              style={styles.leftSideTitle}
              label="Project Type"
              value={
                (item?.projectTypes?.[0]?.name ?? 'N/A') +
                ' ' +
                `${item?.projectTypes?.length > 1 ? `+${item?.projectTypes?.length - 1}` : ''}`
              }
            />
            <ProjectLabelValue
              style={styles.sameWidth}
              label="Status"
              value={item?.projectStatus?.name}
            />
          </View>
        </View>
      </Pressable>
    )
  }
  return (
    <View style={styles.containerHeight}>
      <FlatList
        data={projectDatas}
        extraData={Math.random()}
        keyExtractor={(item: any) => item?.id}
        renderItem={handleRenderItem}
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={handleScroll}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          !isFetchingNextPage && fetchNextPage()
        }}
        ListFooterComponent={
          <View style={{ marginBottom: 50 }}>
            {isFetchingNextPage && !isOffline ? <ActivityIndicator size="large" /> : null}
          </View>
        }
        ListEmptyComponent={
          <NotFound
            style={{ marginHorizontal: 5 }}
            hasSearch
            isFilterPresent={isFilterPresent}
            handleFilterReset={handleFilterReset}
          />
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  )
}

export default ProjectList

const styles = StyleSheet.create({
  containerHeight: { height: '86%', paddingBottom: 20 },
  renderItem: {
    marginBottom: 10,
    borderRadius: 5,
    elevation: 15,
    shadowOpacity: 0.15,
    shadowRadius: 2,
    height: 123,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
  },
  renderTop: {
    height: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  topTextView: {
    backgroundColor: '#c1f6ff',
    paddingHorizontal: 11,
    paddingVertical: 3,
    alignSelf: 'center',
    borderRadius: 4,
  },
  renderTopText: {
    color: '#11aec9',
    fontSize: 10,
    lineHeight: 11.5,
  },
  logtimeStyle: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    lineHeight: 12,
    fontSize: 10,
  },
  renderTitle: {
    marginTop: 5,
    fontSize: 17,
    lineHeight: 24,
  },
  leftSideTitle: {
    width: '49%',
  },
  sameWidth: {
    width: '48.5%',
    marginLeft: '2%',
  },
  detailProject: {
    flexDirection: 'row',
  },
  insideMargin: {
    marginHorizontal: 12,
  },
  logbuttonStyle: {
    marginVertical: -8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginRight: -6,
  },
})
