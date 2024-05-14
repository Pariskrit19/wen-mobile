import React from 'react'
import CircularLeavesBar from './CircularLeavesBar'
import { FlatList, StyleSheet, View } from 'react-native'

type Props = {
  yearlyLeavesTakn: any
  casualLeaveRemainingDays: number
  sickLeaveRemainingDays: number
}

const renderItem = (item: any) => (
  <CircularLeavesBar
    color={item.color}
    daysLabel={item.daysLabel}
    barText={item.barText}
    fill={item.fill}
  />
)

const LeaveBarScreen = ({
  yearlyLeavesTakn,
  casualLeaveRemainingDays,
  sickLeaveRemainingDays,
}: Props) => {
  const paternity = yearlyLeavesTakn?.['Paternity'] || 0
  const maternity = yearlyLeavesTakn?.['Maternity'] || 0
  const bereavement = yearlyLeavesTakn?.['Bereavement'] || 0
  const paidTimeOff = yearlyLeavesTakn?.['Paid Time Off'] || 0
  const casualLeave = yearlyLeavesTakn?.['Casual Leave'] || 0
  const sickLeave = yearlyLeavesTakn?.['Sick Leave'] || 0
  const LeavesData = [
    {
      id: 1,
      color: '#4CB652',
      fill: (casualLeave * 100) / (casualLeave + casualLeaveRemainingDays),
      daysLabel: 'Casual Leave',
      barText: casualLeave,
    },
    {
      id: 2,
      color: '#FD7E14',
      fill: (sickLeave * 100) / (sickLeave + sickLeaveRemainingDays),
      daysLabel: 'Sick Leave',
      barText: sickLeave,
    },
    {
      id: 3,
      color: '#4CB652',
      fill: maternity ? 100 : 0,
      daysLabel: 'Maternity Leave',
      barText: maternity,
    },
    {
      id: 4,
      color: '#45D1E6',
      fill: paternity ? 100 : 0,
      daysLabel: 'Paternity Leave',
      barText: paternity,
    },
    {
      id: 5,
      color: '#F74F75',
      fill: paidTimeOff ? 100 : 0,
      daysLabel: 'Paid Time Off',
      barText: paidTimeOff,
    },
    {
      id: 6,
      color: '#4CB652',
      fill: bereavement ? 100 : 0,
      daysLabel: 'Bereavement',
      barText: bereavement,
    },
  ]
  return (
    <View style={styles.container}>
      {LeavesData.map((item: any) => (
        <CircularLeavesBar
          key={item.id}
          color={item.color}
          daysLabel={item.daysLabel}
          barText={item.barText}
          fill={item.fill}
        />
      ))}
    </View>
  )
}

export default LeaveBarScreen

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 12,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
