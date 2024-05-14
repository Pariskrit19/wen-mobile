import { Entypo } from '@expo/vector-icons'
import MyText from 'components/elements/MyText'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import CommonLeaveRemaining from './CommonLeaveRemaining'

type Props = {
  color?: string
  leaveText?: string
  days?: string
  totalLeave: number
  leavesUsed: number
}

const LeavesUsed = ({ color, leaveText, days, totalLeave, leavesUsed }: Props) => {
  return (
    <View style={styles.container}>
      <CommonLeaveRemaining color="#D9D9D9" leaveText="Total Leaves" days={totalLeave} />
      <CommonLeaveRemaining
        color="#05A9C5"
        leaveText="Leaves Used"
        days={leavesUsed}
        direction="right"
      />
    </View>
  )
}

export default LeavesUsed

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  direction: {
    flexDirection: 'row',
  },
  textStyle: {
    textAlign: 'right',
    fontWeight: '400',
    fontSize: 14,
    color: '#777777',
  },
  daysStyle: {
    fontWeight: '500',
    fontSize: 30,
    color: '#424243',
  },
})
