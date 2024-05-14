import { NavigationProp, useTheme } from '@react-navigation/native'
import React, { useRef, useState, useMemo, useCallback } from 'react'
import { Easing, Pressable, StyleSheet, View } from 'react-native'
import SearchProject from 'components/modules/projects/SearchProject'
import ProjectList from 'components/modules/projects/ProjectList'
import ProjectModal from 'components/modules/projects/ProjectModal'
import ButtonEl from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import { getAllProjects } from 'services/projects'
import ProjectSkeleton from 'components/modules/projects/ProjectSkeleton'
import { Animated } from 'react-native'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import { usePagination } from 'hooks/usePagination'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRefresh } from 'hooks/useRefresh'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import { useAppSelector } from 'redux/hook'
import OfflineWrapper from 'components/modules/OfflineWrapper'
import { debounce } from 'helpers/utils'

type Props = {
  navigation: NavigationProp<any, any>
}

const initialState = {
  projectId: undefined,
  projectStatus: undefined,
  projectTags: undefined,
  projectType: undefined,
  projectClient: undefined,
  developer: undefined,
  designer: undefined,
  qa: undefined,
}

const ProjectScreen = ({ navigation }: Props) => {
  const { colors } = useTheme()
  const [show, setShow] = useState<boolean>(false)
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [tempSearch, setTempSearch] = useState<string>('')
  const [projectData, setProjectData] = useState<any>(initialState)
  const [sort, setSort] = useState<any>({})
  const prevScroll = useRef(0)
  let buttonWidth = useRef(new Animated.Value(100)).current
  const { refreshing, onRefresh } = useRefresh({ keysToRevalidate: ['projects'] })
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    refetch: projectRefetch,
  }: any = usePagination(
    [
      'projects',
      sort,
      projectData.projectType,
      projectData.projectStatus,
      projectData.projectTags,
      projectData.projectClient,
      projectData.developer,
      projectData.designer,
      projectData.qa,
      projectData.projectId,
      tempSearch,
    ],
    async (pageParam: number) =>
      await getAllProjects({
        page: pageParam,
        limit: 10,
        projectType: projectData.projectType?.value,
        project: tempSearch,
        projectStatus: projectData.projectStatus?.value,
        projectTags: projectData.projectTags?.value,
        projectClient: projectData.projectClient?.value,
        developer: projectData?.developer?.value,
        designer: projectData?.designer?.value,
        qa: projectData.qa?.value,
        projectId: projectData.projectid,
        sort:
          sort.order === undefined || sort.column === undefined
            ? ''
            : sort.order === 'ascend'
            ? sort.field
            : `-${sort.field}`,
      }),
    (data: any) => {
      const transformedData = data?.pages
        ?.map((page: any) => [...page?.res?.data?.data?.map((project: any) => project)])
        .flat()

      return transformedData
    },
    isOffline
  )
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const memoRefetch = useMemo(() => [projectRefetch], [projectRefetch])

  useRefreshOnFocus(memoRefetch)

  const handleModalShow = () => {
    bottomSheetRef.current?.snapToIndex(0)
    setShow(true)
  }

  const handleFilterReset = () => {
    setProjectData(initialState)
  }

  const handleScroll = (event: any) => {
    const scrolledValue = event.nativeEvent.contentOffset.y

    // do nothing if the current scroll is equal to previous scroll value
    if (prevScroll.current === scrolledValue) return

    // scroll Down
    if (prevScroll.current < scrolledValue) {
      Animated.timing(buttonWidth, {
        toValue: 40,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start()
    } else {
      // Scroll Up
      Animated.timing(buttonWidth, {
        toValue: 100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start()
    }
    prevScroll.current = scrolledValue
  }
  const handleClickFilter = (data) => {
    let keyss = Object.keys(projectData)
    keyss.forEach((d) => {
      if (projectData[d]?.value && projectData[d]?.value === data?.value) {
        setProjectData((prev) => ({
          ...prev,
          [d]: undefined,
        }))
        return
      }
    })
  }

  const searchHandler = (text: string) => {
    if (text?.length !== 1 || tempSearch?.length >= text?.length) {
      setTempSearch(text)
    }
  }

  const optimizedFn = useCallback(debounce(searchHandler, 500), [tempSearch])

  const datass = Object.values(projectData)?.filter((d) => !!d)

  const handleRemoveSearch = () => {
    setSearch('')
    setTempSearch('')
  }

  const handleSearch = (text: string) => {
    setSearch(text)
    optimizedFn(text)
  }

  return (
    <OfflineWrapper>
      <View style={styles.projectContainer}>
        <SearchProject
          value={search}
          handleRemoveSearch={handleRemoveSearch}
          handleSearch={handleSearch}
        />
        {datass?.length > 0 && (
          <View style={{ ...styles.filterStyle, backgroundColor: colors.headerBackground }}>
            <MyText fontStyle={FONT_CONST.rubikRegular}>Filters:</MyText>
            {datass?.map((d) => (
              <Pressable
                onPress={() => handleClickFilter(d)}
                style={{ ...styles.filterDataStyle, backgroundColor: colors.dropdownboxColor }}
              >
                <View style={styles.filterLabelStyle}>
                  <MyText fontStyle={FONT_CONST.rubikRegular} style={{ fontSize: 13 }}>
                    {d?.label}
                  </MyText>
                </View>
                <Icon
                  containerStyles={{
                    backgroundColor: 'rgba(34 ,34 ,34 , 0.7)',
                    padding: 2,
                    borderRadius: 7,
                  }}
                  name="close"
                  height={10}
                  width={10}
                  isFill={true}
                  fill={'white'}
                />
              </Pressable>
            ))}
          </View>
        )}

        {isLoading && !isOffline ? (
          [0, 1, 2, 3, 4, 5, 6].map((card) => <ProjectSkeleton key={card} />)
        ) : (
          <ProjectList
            projectDatas={data || []}
            handleScroll={handleScroll}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            refreshing={refreshing}
            onRefresh={onRefresh}
            handleFilterReset={handleFilterReset}
            isFilterPresent={datass?.length > 0}
          />
        )}
        <ProjectModal
          show={show}
          handleModalShow={setShow}
          projectData={projectData}
          setProjectData={setProjectData}
          bottomSheetRef={bottomSheetRef}
        />
        <ButtonEl
          title="Filter"
          onPress={handleModalShow}
          btnWidth={buttonWidth}
          btnHeight={40}
          hasIcon
          iconToLeft
          btnTextBold
          fontSize={16}
          btnTextColor="white"
          icon={<Icon name="filter" width={30} height={30} color="black" isFill fill={'white'} />}
          styles={styles.buttonStyles}
          isAnimated
        />
      </View>
    </OfflineWrapper>
  )
}

export default ProjectScreen

const styles = StyleSheet.create({
  projectContainer: {
    flex: 1,
    marginHorizontal: 9,
    marginTop: 20,
  },
  buttonStyles: {
    position: 'absolute',
    bottom: 40,
    right: 4,
    borderRadius: 20,
  },
  filterStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 15,
    paddingHorizontal: 5,
    paddingVertical: 2,
    flexWrap: 'wrap',
    marginHorizontal: 3,
    borderRadius: 5,
  },
  filterDataStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingRight: 5,
    marginHorizontal: 2,
    marginVertical: 2,
    borderRadius: 3,
  },
  filterLabelStyle: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
})
