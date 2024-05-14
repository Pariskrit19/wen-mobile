import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useAppSelector } from 'redux/hook'
import { NestedNavigation } from './NestedNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { handleScreenFade } from 'utils'
import { AuthStack } from './AuthStack'
import { createStackNavigator } from '@react-navigation/stack'
import * as Notifications from 'expo-notifications'
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native'
import { DashboardRoutes, NavigationRoutes } from 'constants/routes'
import { socket } from '../../App'

const Stack = createStackNavigator()

// do not use default Text component directly use MyText component instead
const Navigation = () => {
  const { token } = useAppSelector((state) => state.initialLoad)
  const navigation: NavigationProp<any> = useNavigation()

  React.useEffect(() => {
    let subscription: any = null
    if (token) {
      subscription = Notifications.addNotificationResponseReceivedListener((response) => {
        const notificationType = response.notification.request.content.data.type

        if (notificationType === 'notice')
          navigation.dispatch(
            CommonActions.navigate('NestedNav', {
              screen: DashboardRoutes.Notifications,
            })
          )
        if (notificationType === 'leave')
          navigation.dispatch(
            CommonActions.navigate('NestedNav', {
              screen: DashboardRoutes.Dashboard,
              params: {
                screen: NavigationRoutes.Leaves,
              },
            })
          )
      })
      socket.on('maitenance-toggle-mobile', (res) => {
        if (res.isEnabled) {
          navigation.navigate(NavigationRoutes.Maintenance)
        } else {
          navigation.dispatch(
            CommonActions.navigate('NestedNav', {
              screen: DashboardRoutes.Dashboard,
            })
          )
        }
      })
    }

    return () => {
      if (subscription) subscription.remove()
    }
  }, [token])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <Stack.Navigator
          initialRouteName="root"
          screenOptions={{ headerShown: false, cardStyleInterpolator: handleScreenFade }}
        >
          {token ? NestedNavigation : AuthStack}
        </Stack.Navigator>
      </View>
    </GestureHandlerRootView>
  )
}

export default Navigation

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
})
