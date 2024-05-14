import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CoWorkersRoute } from 'constants/routes'
import { NavigationProp } from '@react-navigation/native'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import { handleScreenFade } from 'utils'
import CoWorkersScreen from 'screens/coworkers'
import CoWorkersDetails from 'screens/coworkers/CoWorkerDetails'

const Stack = createStackNavigator()

const CoworkersNavigation = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  return (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: handleScreenFade }}>
      <Stack.Screen
        name={CoWorkersRoute.CoWorkers}
        component={CoWorkersScreen}
        options={{
          header: ({ navigation }) => (
            <CommonScreenHeader title="Co-Workers" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name={CoWorkersRoute.CoWorkerDetails}
        component={CoWorkersDetails}
        options={{
          header: ({ navigation }) => (
            <CommonScreenHeader title="Details" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default CoworkersNavigation

const styles = StyleSheet.create({})
