import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import OfflineWrapper from 'components/modules/OfflineWrapper'
import Birthdays from 'components/modules/dashboard/Birthdays'
import DashboardCalendar from 'components/modules/dashboard/Calendar'
import CoWorkersOnLeave from 'components/modules/dashboard/CoWorkersOnLeave'
import { DashboardHeader } from 'components/modules/dashboard/DashboardHeader'
import Holidays from 'components/modules/dashboard/Holidays'
import UpcomingActiviites from 'components/modules/dashboard/UpcomingActivities'
import { tabBarStyles } from 'constants/styles/TabBarStyle'
import { useRefresh } from 'hooks/useRefresh'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import React, { useCallback, useRef } from 'react'
import {
  Animated,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { setUserData } from 'redux/reducer/authSlice'
import { getUser } from 'services/users'

type DashboardProps = {
  navigation: any
}

export const DashboardScreen = ({ navigation }: DashboardProps) => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const isFocused = useIsFocused()
  const translation = useRef(new Animated.Value(0)).current
  const currOffset = useRef(0)
  const { height } = useWindowDimensions()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const { data: myInfo, refetch } = useQuery(['MyInfo'], () => getUser(authUser?._id), {
    onSuccess: (data) => {
      if (data?.data?.data?.length > 0) {
        dispatch(setUserData(data?.data?.data?.[0]))
      }
    },
    enabled: !isOffline,
  })
  useRefreshOnFocus([refetch])

  const { refreshing, onRefresh } = useRefresh({
    keysToRevalidate: ['DashBoard', 'userAttendance'],
  })

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event?.nativeEvent?.contentOffset?.y
    // do nothing if the current scroll is equal to previous scroll value
    if (scrollOffset === currOffset.current) return

    // Determine scroll direction
    const scrollDirection = scrollOffset > currOffset.current ? 'down' : 'up'
    if (refreshing) return
    //console.log('handleScroll', scrollOffset)

    // Hide Bottom tab when scrolling down
    if (scrollDirection === 'down' && isFocused) {
      //console.log('scrollDirection', scrollDirection)
      if (Platform.OS === 'ios' && scrollOffset < 110) return
      Animated.timing(translation, {
        toValue: Platform.OS === 'ios' ? 138 : 120,
        duration: 280,
        easing: Easing.linear,

        useNativeDriver: true,
      }).start()

      // Update navigation bar style
      navigation.setOptions({
        tabBarStyle: {
          ...tabBarStyles,
          transform: [{ translateY: translation }],
        },
      })
    } else if (scrollDirection === 'up' && isFocused) {
      //console.log('scrollDirection', scrollDirection)
      if ((Platform.OS === 'ios' && scrollOffset < 0) || scrollOffset > 70) return
      // Show bottom tab immediately when scrolling up
      Animated.timing(translation, {
        toValue: 0,
        duration: 260, // Adjust the duration as needed
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()

      // Update navigation bar style
      navigation.setOptions({
        tabBarStyle: {
          ...tabBarStyles,
          transform: [{ translateY: translation }],
        },
      })
    }

    // Update current scroll offset
    currOffset.current = scrollOffset
  }

  return (
    <SafeAreaView>
      <OfflineWrapper>
        <DashboardHeader />
        <View style={styles.main}>
          <ScrollView
            style={{ height: Platform.OS === 'ios' ? height - 30 : height }}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            overScrollMode="never"
            scrollEventThrottle={2}
            bounces={!refreshing}
            decelerationRate={'fast'}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={styles.scrollView}>
              <DashboardCalendar isDashboard disabledByDefault hideArrows />
              <CoWorkersOnLeave />
              <UpcomingActiviites />
              <Holidays />
              <Birthdays />
              <View style={{ marginBottom: isOffline ? 245 : 150 }} />
            </View>
          </ScrollView>
        </View>
      </OfflineWrapper>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    marginTop: 16,
    elevation: 4,
    gap: 12,
  },
  scrollView: {
    marginBottom: 25,
    gap: 12,
  },
})
