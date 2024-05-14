import 'expo-asset'

import React, { useState, useEffect } from 'react'
import { AppState, Platform, StatusBar, View, useColorScheme } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Provider } from 'react-redux'
import ErrorDialog from './src/components/elements/ErrorDialog'
import Navigation from './src/navigation'
import store from './src/redux/store'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import * as NavigationBar from 'expo-navigation-bar'
import { useFonts } from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MuiFormatDate, getDarkModeStatus } from 'utils'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { toggleTheme } from 'redux/reducer/themeSlice'
import { backgroundColor } from 'styles/colors'
import moment from 'moment'
import { getLocationName, searchAttendacentOfUser } from 'services/attendance'
import { setPunchInDatas } from 'redux/reducer/attendanceSlice'
import { setUserData } from 'redux/reducer/authSlice'
import { ToastProvider, useToast } from 'react-native-toast-notifications'
import socketIOClient from 'socket.io-client'
import { Env } from './src/env'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import { FONT_CONST, NO_INTERNET } from 'helpers/constants'
import { setToken } from 'redux/reducer/initialLoadingSlice'
import NetInfo, { addEventListener } from '@react-native-community/netinfo'
import { NavigationContainer, useTheme } from '@react-navigation/native'
import { MyDarkTheme, MyTheme } from 'utils/theme'
import { setIsOffline } from 'redux/reducer/commonSlice'
import { commonToast } from 'helpers/utils'
import { navigationRef } from 'navigation/RootNavigation'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()
const queryClient = new QueryClient()

// export const socket = socketIOClient(process.env.REACT_APP_API_ENDPOINT || '', {
export const socket = socketIOClient(Env.API_URL || '', {
  transports: ['websocket'],
})

export default function App(): JSX.Element | null {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <InitialApp />
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  )
}

const InitialApp = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const { token } = useAppSelector((state) => state.initialLoad)
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const [appIsReady, setAppIsReady] = useState(false)
  const dispatch = useAppDispatch()
  const [date, setDate] = useState([moment().startOf('day'), moment().endOf('day')])
  const page = { page: 1, limit: 50 }
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const toast = useToast()
  const { data, isLoading, isFetching } = useQuery(
    ['userAttendance', authUser?._id],
    () =>
      searchAttendacentOfUser({
        userId: authUser?._id,
        fromDate: date?.[0] ? MuiFormatDate(date[0]?._d) + 'T00:00:00Z' : '',
        toDate: date?.[1] ? MuiFormatDate(date[1]?._d) + 'T00:00:00Z' : '',
        sort: 'attendanceDate',
        page: page.page,
        limit: page.limit,
      }),
    {
      enabled: Object.keys(authUser || {})?.length > 0,
      onSuccess: async (response) => {
        if (response.status) {
          try {
            var locationName
            const locationInfo = response?.data?.attendances[0]?.data?.[0]?.data?.[0]
            if (locationInfo) {
              const longLat =
                (locationInfo?.punchOutLocation?.length && locationInfo?.punchOutLocation) ||
                (locationInfo?.punchInLocation?.length && locationInfo?.punchInLocation)
              if (longLat?.length) {
                locationName = await getLocationName(longLat[0], longLat[1])
              }
            }
            const firstPunchIn =
              response?.data?.attendances?.[0]?.data?.at(0)?.data?.[0]?.punchInTime
            const lastPunchIn = response?.data?.attendances?.[0]?.data
              ?.at(0)
              ?.data?.at(-1)?.punchInTime

            const lastPunchOut = response?.data?.attendances?.[0]?.data
              ?.at(0)
              ?.data?.at(-1)?.punchOutTime
            const lastPunchId = response?.data?.attendances?.[0]?.data?.at(0)?.data?.at(-1)?._id
            const firstPunchInTime =
              firstPunchIn && moment(firstPunchIn).format('HH:mm')?.split(' ')?.[0]
            const punchOutTime =
              lastPunchOut && moment(lastPunchOut).format('HH:mm')?.split(' ')?.[0]
            const totalWorkingHours = response?.data?.attendances?.[0]?.data?.[0]?.officehour
            dispatch(
              setPunchInDatas({
                isPunchIn: lastPunchIn && !lastPunchOut,
                lastPunchId,
                punchInTime: firstPunchInTime,
                lastPunchIn: lastPunchIn,
                punchOutTime,
                totalWorkingHours,
                location: locationName?.title || locationName?.address?.label,
              })
            )
          } catch (err) {
            console.log('error app file', err)
          }
        }
      },
    }
  )

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const darkModeStatus = await AsyncStorage.getItem('token')

        if (darkModeStatus) setIsUserLoggedIn(true)
      } catch (err) {
        console.log('err from app.tsx')
      }
    }
    getLoggedInUser()
  }, [token])

  const [fontsLoaded] = useFonts({
    'NunitoSans-Regular': require('assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Medium': require('assets/fonts/NunitoSans-Medium.ttf'),
    'NunitoSans-SemiBold': require('assets/fonts/NunitoSans-SemiBold.ttf'),
    'NunitoSans-ExtraBold': require('assets/fonts/NunitoSans-ExtraBold.ttf'),
    'Rubik-Light': require('assets/fonts/Rubik-Light.ttf'),
    'Rubik-Bold': require('assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Medium': require('assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Regular': require('assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Italic': require('assets/fonts/Rubik-LightItalic.ttf'),
  })

  const backgroundStyle = {
    backgroundColor: darkMode ? Colors.darker : Colors.lighter,
  }

  useEffect(() => {
    const setInitialConfiguration = async () => {
      try {
        const darkModeStatus = await AsyncStorage.getItem('darkMode')
        const darkMode = getDarkModeStatus(darkModeStatus, isDarkMode)
        const token = await AsyncStorage.getItem('token')
        const authUserData = await AsyncStorage.getItem('authUser')

        if (authUserData) {
          dispatch(setUserData(JSON.parse(authUserData)))
        }

        if (token) dispatch(setToken(token))

        dispatch(toggleTheme(darkMode))
        if (Platform.OS === 'android') {
          NavigationBar.setBackgroundColorAsync(darkMode ? 'black' : backgroundColor)
          NavigationBar.setButtonStyleAsync(darkMode ? 'light' : 'dark')
        }

        setAppIsReady(true)
      } catch (err) {
        console.log(err)
      }
    }
    if (fontsLoaded) {
      setInitialConfiguration()
    }
  }, [fontsLoaded, isDarkMode, darkMode])

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  useEffect(() => {
    const removeNetInfoSubscription = addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable)
      dispatch(setIsOffline(offline))
    })

    return () => removeNetInfoSubscription()
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        NetInfo.fetch().then((state) => {
          if (!state.isConnected)
            commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
        })
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  if (!appIsReady) return null
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToastProvider
        placement="top"
        successColor="rgb(16, 112, 16 );"
        warningColor="rgb(173, 159, 3)"
        dangerColor="rgb(184, 12, 0)"
        successIcon={
          <Icon name="successToast" width={20} height={20} isFill fill="rgb(16, 112, 16)" />
        }
        dangerIcon={<Icon name="errorToast" width={20} height={20} isFill fill="rgb(184, 12, 0)" />}
        warningIcon={
          <Icon name="warningToast" width={20} height={20} isFill fill="rgb(173, 159, 3)" />
        }
        duration={5000}
        offsetTop={Platform.OS === 'android' ? 0 : 105}
        renderToast={(toast) => {
          let toastIcon, toastTextColor, toastBackgroundColor
          if (toast.type === 'success') {
            toastIcon = toast?.successIcon
            toastTextColor = toast?.successColor
            toastBackgroundColor = 'rgba(16, 112, 16 , 0.1);'
          } else if (toast.type === 'danger') {
            toastIcon = toast?.dangerIcon
            toastTextColor = toast?.dangerColor
            toastBackgroundColor = 'rgba(184, 12, 0,0.1)'
          } else if (toast.type === 'warning') {
            toastIcon = toast?.warningIcon
            toastTextColor = toast?.warningColor
            toastBackgroundColor = 'rgba(173, 159, 3,0.1)'
          }
          return (
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: toastTextColor,
                borderRadius: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: toastBackgroundColor,
                  padding: 10,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                }}
              >
                {toastIcon}
                <MyText
                  fontStyle={FONT_CONST.rubikMedium}
                  hasCustomColor
                  style={{ color: toastTextColor, fontSize: 14, marginLeft: 5 }}
                >
                  {toast.message}
                </MyText>
              </View>
            </View>
          )
        }}
      >
        <SafeAreaProvider style={backgroundStyle} onLayout={onLayoutRootView}>
          <NavigationContainer theme={darkMode ? MyDarkTheme : MyTheme} ref={navigationRef}>
            <StatusBar
              barStyle={darkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />

            <Navigation />
            <ErrorDialog />
          </NavigationContainer>
        </SafeAreaProvider>
      </ToastProvider>
    </SafeAreaView>
  )
}
