import React from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import LeaveCircularBar from './LeaveCircularBar'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import { LeaveRoutes } from 'constants/routes'

type Props = {
  casualLeaveRemainingDays: number
  sickLeaveRemainingDays: number
  yearlyLeavesTakn: any
  currentQuarter: any
}

const LeaveDaysCount = ({
  casualLeaveRemainingDays,
  sickLeaveRemainingDays,
  yearlyLeavesTakn,
  currentQuarter,
}: Props) => {
  const navigation: NavigationProp<any, any> = useNavigation()
  const { colors } = useTheme()

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollStyles}
    >
      <Pressable
        onPress={() => {
          navigation.navigate(LeaveRoutes.MyLeaves)
        }}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: colors.tabCountQuarter,
          }}
        >
          <LeaveCircularBar
            color="#4CB652"
            fill={100}
            daysLabel="Quarterly Leaves"
            daysText={`${
              currentQuarter?.allocatedLeaves + currentQuarter?.carriedOverLeaves || 0
            } Days`}
          />
          <LeaveCircularBar
            color="#FD7E14"
            fill={
              (currentQuarter?.remainingLeaves * 100) /
              (currentQuarter?.allocatedLeaves + currentQuarter?.carriedOverLeaves)
            }
            daysLabel=" Leaves Remaining"
            daysText={`${currentQuarter?.remainingLeaves || 0} Days`}
          />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate(LeaveRoutes.MyLeaves)
        }}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: colors.tabCountAnnual,
            marginLeft: 15,
            marginRight: 12,
          }}
        >
          <LeaveCircularBar
            color="#4363C6"
            fill={
              (casualLeaveRemainingDays * 100) /
              ((yearlyLeavesTakn?.['Casual Leave'] || 0) + casualLeaveRemainingDays)
            }
            daysLabel="Casual Leave"
            daysText={`${casualLeaveRemainingDays} Days`}
          />
          <LeaveCircularBar
            color="#F74F75"
            fill={
              (sickLeaveRemainingDays * 100) /
              ((yearlyLeavesTakn?.['Sick Leave'] || 0) + sickLeaveRemainingDays)
            }
            daysLabel="Sick Leave"
            daysText={`${sickLeaveRemainingDays} Days`}
          />
        </View>
      </Pressable>
    </ScrollView>
  )
}

export default LeaveDaysCount

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#feedf1',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  scrollStyles: {
    flex: 2,
    marginTop: 25,
    // marginLeft: 15,
  },
  daysText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  leaveText: {
    fontSize: 12,
    fontWeight: '400',
  },
})
