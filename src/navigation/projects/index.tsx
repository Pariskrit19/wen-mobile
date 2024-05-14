import { StyleSheet } from 'react-native'
import React from 'react'
import { ProjectLogRoutes, ProjectRoutes } from 'constants/routes'
import { NavigationProp } from '@react-navigation/native'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import ProjectDetailsScreen from 'screens/project/ProjectDetailsScreen'
import ProjectScreen from 'screens/project'
import { createStackNavigator } from '@react-navigation/stack'
import { handleScreenFade } from 'utils'
import AddLogScreen from 'screens/logTime/AddLogScreen'
import LogDetails from 'screens/logTime/LogDetails'
import ProjectLogsScreen from 'screens/projectLogs'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Stack = createStackNavigator()

const ProjectStackNavigation = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  return (
    <BottomSheetModalProvider>
      <Stack.Navigator screenOptions={{ cardStyleInterpolator: handleScreenFade }}>
        <Stack.Screen
          name={ProjectRoutes.Projects}
          component={ProjectScreen}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader title="Projects" navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name={ProjectRoutes.ProjectDetails}
          component={ProjectDetailsScreen}
          options={{
            header: ({ navigation, route }) => (
              <CommonScreenHeader title={route?.params?.item?.name} navigation={navigation} />
            ),
          }}
        />

        <Stack.Screen
          name={ProjectLogRoutes.Logtimes}
          component={ProjectLogsScreen}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader title="Project Log" navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name={ProjectLogRoutes.AddLog}
          component={AddLogScreen}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader title="Add Project Log" navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name={ProjectLogRoutes.LogDetails}
          component={LogDetails}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader title="Log Details" navigation={navigation} />
            ),
          }}
        />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  )
}

export default ProjectStackNavigation

const styles = StyleSheet.create({})
