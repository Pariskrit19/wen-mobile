import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp, useTheme } from '@react-navigation/native'
import { useAppSelector } from 'redux/hook'
import { DashboardRoutes, LeaveRoutes } from 'constants/routes'
import { CommonActions } from '@react-navigation/native'
import Icon from 'components/elements/Icon'

const LeaveBackButton = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const isLeaveFromNotification = navigation?.getState()?.routes?.[0]?.params?.isFromNotification

  const handleGoBack = () =>
    isLeaveFromNotification
      ? navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: DashboardRoutes.Dashboard },
              {
                name: DashboardRoutes.Notifications,
                params: { isFromNotification: false },
              },
            ],
          })
        )
      : navigation.goBack()

  return (
    <Pressable onPress={handleGoBack} style={styles.pressable}>
      <Icon
        width="30"
        height="16"
        name="BackArrow"
        fill={darkMode ? '#fff' : '#1E1E1E'}
        isFill={true}
      />
    </Pressable>
  )
}

export default LeaveBackButton

const styles = StyleSheet.create({
  pressable: {
    padding: 0,
    marginLeft: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  pressed: {
    backgroundColor: '#f2eeed',
  },
})

// const dynamicStyles = (darkMode: boolean) =>
//   StyleSheet.create({
//     pressed: {
//       backgroundColor: darkMode ? '#ccc' : '#f2eeed',
//     },
//   })
