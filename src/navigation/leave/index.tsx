import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LeaveRoutes } from 'constants/routes'
import { NavigationProp } from '@react-navigation/native'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import LeaveScreen from 'screens/leaves'
import LeaveDetailScreen from 'screens/leaves/LeaveDetailScreen'
import AddLeave from 'screens/leaves/AddLeave'
import MyLeaves from 'screens/leaves/MyLeaves'
import { handleScreenFade } from 'utils'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Stack = createStackNavigator()

const LeaveStackNavigation = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  return (
    <BottomSheetModalProvider>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: handleScreenFade,
        }}
      >
        <Stack.Screen
          name={LeaveRoutes.Leaves}
          component={LeaveScreen}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader
                title="Leave Management"
                navigation={navigation}
                isFromLeave={true}
              />
            ),
          }}
        />
        <Stack.Screen
          name={LeaveRoutes.LeaveDetails}
          component={LeaveDetailScreen}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader title="Leave Management" navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name={LeaveRoutes.AddLeave}
          component={AddLeave}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader title="Add Leave" navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name={LeaveRoutes.MyLeaves}
          component={MyLeaves}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader title="My Leaves" navigation={navigation} />
            ),
          }}
        />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  )
}

export default LeaveStackNavigation
