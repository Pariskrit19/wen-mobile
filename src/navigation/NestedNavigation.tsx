import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DashboardRoutes, NavigationRoutes } from 'constants/routes'
import { LocaleConfig } from 'react-native-calendars'
import Icon from 'components/elements/Icon'
import { NavigationProp, useTheme } from '@react-navigation/native'
import DashboardTabNavigation from './dashboard'
import { createStackNavigator } from '@react-navigation/stack'
import { handleScreenFade } from 'utils'
import NotificationsScreen from 'screens/dashboard/notices/NotificationsScreen'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import NoticeBoardScreen from 'screens/dashboard/notices/NoticeBoardScreen'
import NoticeDetails from 'screens/dashboard/notices/Details'
import CalendarScreen from 'screens/dashboard/CalendarScreen'
import EditDetail from 'screens/editDetail'
import ProfileScreen from 'screens/dashboard/profile'
import ButtonEl from 'components/elements/Button'
import NewpasswordScreen from 'screens/newPassword'
import MyInformation from 'screens/dashboard/profile/MyInformation'
import { useBiometric } from 'hooks/useBiometric'
import { authenticateAsync } from 'expo-local-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IS_FIRST_TIME, USER_BIOMETRIC_KEY } from 'helpers/constants'
import { useAppSelector } from 'redux/hook'
import { useToast } from 'react-native-toast-notifications'
import Maintenance from './Maintenance'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

//OverWriting Names of the days in calendar
LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul.',
    'Aug',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
}
LocaleConfig.defaultLocale = 'fr'

export const TabNavigator = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any, any>
  route: any
}) => {
  const { colors } = useTheme()
  const { isBiometricSupported, fingerprint } = useBiometric()
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const toast = useToast()

  const handleBiometric = async () => {
    const isFirstTimeLogin = await AsyncStorage.getItem(IS_FIRST_TIME)
    if (!isBiometricSupported || !fingerprint || isFirstTimeLogin === 'no') return
    const biometricResult = await authenticateAsync({
      disableDeviceFallback: true,
      promptMessage: 'Enable biometrics login',
      cancelLabel: 'Cancel',
    })

    if (biometricResult?.success) {
      await AsyncStorage.setItem(USER_BIOMETRIC_KEY, JSON.stringify(authUser))
      toast.show('Successfully setup biometric', { type: 'success' })
    }
    await AsyncStorage.setItem(IS_FIRST_TIME, 'no')
  }

  useEffect(() => {
    handleBiometric()
  }, [isBiometricSupported, fingerprint])

  return (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: handleScreenFade }}>
      <Stack.Screen
        name={DashboardRoutes.Dashboard}
        component={DashboardTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={DashboardRoutes.Notifications}
        component={NotificationsScreen}
        options={{
          header: () => <CommonScreenHeader title="Notifications" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name={DashboardRoutes.NoticeBoard}
        component={NoticeBoardScreen}
        options={{
          header: () => <CommonScreenHeader title="Notice Board" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name={DashboardRoutes.NoticeDetails}
        component={NoticeDetails}
        options={({ route }: any) => ({
          header: () => (
            <CommonScreenHeader
              title={route?.params?.title || 'Notice Detail'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name={DashboardRoutes.Calendar}
        component={CalendarScreen}
        options={({ route }: any) => ({
          header: () => <CommonScreenHeader title="Calendar" navigation={navigation} />,
        })}
      />

      <Stack.Screen
        name={NavigationRoutes.EditDetail}
        component={EditDetail}
        options={({ route }: any) => ({
          header: () => <CommonScreenHeader title="Edit Details" navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={NavigationRoutes.MyInformation}
        component={MyInformation}
        options={{
          header: ({ navigation }) => (
            <CommonScreenHeader
              title="My Information"
              navigation={navigation}
              headerRight={
                <ButtonEl
                  btnWidth={55}
                  btnHeight={50}
                  styles={{ elevation: 0, marginLeft: -20 }}
                  backgroundColor={'transparent'}
                  onPress={() => {
                    navigation.navigate(NavigationRoutes.EditDetail)
                  }}
                  hasIcon={true}
                  icon={
                    <Icon name="Edit" width={24} height={24} fill={colors.semiIconColor} isFill />
                  }
                />
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name={DashboardRoutes.MyProfile}
        component={ProfileScreen}
        options={{
          header: ({ navigation }) => (
            <CommonScreenHeader
              title="My Profile"
              navigation={navigation}
              headerRight={
                <ButtonEl
                  btnWidth={55}
                  btnHeight={50}
                  styles={{ elevation: 0, marginLeft: -20 }}
                  backgroundColor={'transparent'}
                  onPress={() => {
                    navigation.navigate(NavigationRoutes.EditDetail)
                  }}
                  hasIcon={true}
                  icon={
                    <Icon name="Edit" width={24} height={24} fill={colors.semiIconColor} isFill />
                  }
                />
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name={DashboardRoutes.NewPassword}
        component={NewpasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export const NestedNavigation = (
  <Stack.Group screenOptions={{ headerShown: false, cardStyleInterpolator: handleScreenFade }}>
    <Stack.Screen name="NestedNav" component={TabNavigator} />
    <Stack.Screen name={NavigationRoutes.Maintenance} component={Maintenance} />
  </Stack.Group>
)

const styles = StyleSheet.create({})
