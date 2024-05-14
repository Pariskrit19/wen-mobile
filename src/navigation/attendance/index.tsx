import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { AttendanceRoutes } from 'constants/routes'
import { NavigationProp, useTheme } from '@react-navigation/native'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import PunchInOutScreen from 'screens/attendance'
import { createStackNavigator } from '@react-navigation/stack'
import { handleScreenFade } from 'utils'
import ButtonEl from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import AttendanceDetail from 'screens/attendance/AttendanceDetail'
import AttendanceCalendar from 'screens/attendance/AttendanceCalendar'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Stack = createStackNavigator()

const PunchStackNavigation = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { colors } = useTheme()

  const handleModal = () => {
    setOpenModal((prev) => !prev)
  }

  return (
    <BottomSheetModalProvider>
      <Stack.Navigator screenOptions={{ cardStyleInterpolator: handleScreenFade }}>
        <Stack.Screen
          name={AttendanceRoutes.PunchInOut}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader
                navigation={navigation}
                title="Attendance"
                headerRight={
                  <ButtonEl
                    btnWidth={55}
                    btnHeight={50}
                    styles={{ elevation: 0, marginLeft: -20 }}
                    backgroundColor={'transparent'}
                    onPress={handleModal}
                    hasIcon={true}
                    icon={
                      <Icon
                        name="dotOptions"
                        width={24}
                        height={24}
                        fill={colors.semiIconColor}
                        isFill
                      />
                    }
                  />
                }
              />
            ),
          }}
        >
          {(props) => (
            <PunchInOutScreen openModal={openModal} handleModal={handleModal} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={AttendanceRoutes.Attendance}
          component={AttendanceCalendar}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader navigation={navigation} title="Attendance Calendar" />
            ),
          }}
        />
        <Stack.Screen
          name={AttendanceRoutes.AttendanceDetails}
          component={AttendanceDetail}
          options={{
            header: ({ navigation }) => (
              <CommonScreenHeader navigation={navigation} title="Attendance Details" />
            ),
          }}
        />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  )
}

export default PunchStackNavigation

const styles = StyleSheet.create({})
