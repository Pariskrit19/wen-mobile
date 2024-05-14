import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { LeaveRoutes } from 'constants/routes'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AllLeave from 'screens/leaves/tabScreen/AllLeave'
import CasualLeave from 'screens/leaves/tabScreen/CasualLeave'
import SickLeave from 'screens/leaves/tabScreen/SickLeave'
import { Entypo } from '@expo/vector-icons'
import CustomIconLabel from './CustomIconLabel'
import MyText from 'components/elements/MyText'
import { useTheme } from '@react-navigation/native'

type Props = {}

const Tab = createMaterialTopTabNavigator()

const LeaveTabBar = (props: Props) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        flex: 8,
        borderRadius: 40,
        marginTop: 20,
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 50,
            borderRadius: 10,
            marginTop: 5,
            marginHorizontal: 15,
            justifyContent: 'center',
            backgroundColor: colors.leaveTabBar,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.semiCardBackground,
            height: '100%',
            borderRadius: 10,
            elevation: 3,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            shadowRadius: 5,
            shadowOpacity: 0.15,
          },
          tabBarLabelStyle: {
            color: 'rgba(96, 96, 96, 1)',
            borderRadius: 10,
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: 25,
            backgroundColor: 'yellow',
          },
        }}
      >
        <Tab.Screen
          name={LeaveRoutes.AllLeave}
          component={AllLeave}
          options={{
            tabBarShowLabel: false,
            tabBarIconStyle: styles.iconStyles,
            tabBarIcon: ({ focused }) => <CustomIconLabel label="All" focused={focused} />,
            tabBarActiveTintColor: 'green',
          }}
        />
        <Tab.Screen
          name={LeaveRoutes.CasualLeave}
          component={CasualLeave}
          options={{
            tabBarShowLabel: false,
            tabBarIconStyle: styles.iconStyles,
            tabBarIcon: ({ focused }) => (
              <CustomIconLabel color="#4363C6" label="Casual" focused={focused} />
            ),
            tabBarLabel: () => <MyText>All</MyText>,
            tabBarActiveTintColor: 'green',
          }}
        />
        <Tab.Screen
          name={LeaveRoutes.SickLeave}
          component={SickLeave}
          options={{
            tabBarShowLabel: false,
            tabBarIconStyle: styles.iconStyles,
            tabBarIcon: ({ focused }) => (
              <CustomIconLabel color="#F74F75" label="Sick" focused={focused} />
            ),
            tabBarLabel: () => <MyText>All</MyText>,
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default LeaveTabBar

const styles = StyleSheet.create({
  iconStyles: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'center',
  },
})
