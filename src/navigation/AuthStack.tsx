import React from 'react'
import LoginScreen from '../screens/auth/Login'
import { DashboardRoutes, NavigationRoutes } from '../constants/routes'
import { createStackNavigator } from '@react-navigation/stack'
import { handleScreenFade } from 'utils'
import ResetForm from 'screens/resetForm'
import ResetPassword from 'screens/resetPassword'
import NewpasswordScreen from 'screens/newPassword'

const Stack = createStackNavigator()

export const AuthStack = (
  <Stack.Group
    // initialRouteName={NavigationRoutes.EditDetail}
    screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: 'black',
      cardStyleInterpolator: handleScreenFade,
    }}
  >
    <Stack.Screen name={NavigationRoutes.Login} component={LoginScreen} />

    <Stack.Screen name={NavigationRoutes.ResetPasswordForm} component={ResetForm} />
    <Stack.Screen name={NavigationRoutes.ResetPassword} component={ResetPassword} />
    <Stack.Screen
      name={DashboardRoutes.NewPassword}
      component={NewpasswordScreen}

    />
  </Stack.Group>
)
