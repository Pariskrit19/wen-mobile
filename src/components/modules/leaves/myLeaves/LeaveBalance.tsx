import { useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

type Props = {
  totalLeave: number
  totalRemainingDays: number
}

const LeaveBalance = ({ totalLeave, totalRemainingDays }: Props) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        rotation={0}
        size={246}
        width={7}
        duration={0}
        fill={(totalRemainingDays * 100) / totalLeave}
        tintColor={'#05A9C5'}
        backgroundColor="#D9D9D9"
      >
        {(props) => (
          <View>
            <MyText
              style={{ ...styles.daysText, color: colors.headerFont }}
              hasCustomColor
              fontStyle={FONT_CONST.bold}
            >
              {totalRemainingDays}
            </MyText>
            <MyText
              style={{ ...styles.leaveBalance, color: colors.punchInOutTime }}
              hasCustomColor
              fontStyle={FONT_CONST.rubikRegular}
            >
              Leave Balance
            </MyText>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  )
}

export default LeaveBalance

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  daysText: {
    textAlign: 'center',
    fontSize: 60,
  },
  leaveBalance: {
    textAlign: 'center',
    fontSize: 22,
  },
})
