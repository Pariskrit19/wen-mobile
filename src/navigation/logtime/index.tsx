import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LogtimeRoutes } from '../../constants/routes'
import AddLogScreen from 'screens/logTime/AddLogScreen'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import { handleScreenFade } from 'utils'
import LogTimeScreen from 'screens/logTime'
import LogDetails from 'screens/logTime/LogDetails'

const Stack = createStackNavigator()

const LogTimeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: handleScreenFade }}>
      <Stack.Screen
        name={LogtimeRoutes.Logtimes}
        component={LogTimeScreen}
        options={{
          header: ({ navigation }) => (
            <CommonScreenHeader title="Logtime" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name={LogtimeRoutes.AddLog}
        component={AddLogScreen}
        options={{
          header: ({ navigation }) => (
            <CommonScreenHeader title="Add a Log" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name={LogtimeRoutes.LogDetails}
        component={LogDetails}
        options={({ route, navigation }: any) => ({
          header: () => <CommonScreenHeader navigation={navigation} title="Log Details" />,
        })}
      />
    </Stack.Navigator>
  )
}

export default LogTimeStackNavigation

const styles = StyleSheet.create({})
