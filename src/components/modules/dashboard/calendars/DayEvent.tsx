import { useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  month: string
  year: string
  date: string
  day: string
  eventData: any
}

const DayEvent = ({ month, year, date, day, eventData }: Props) => {
  const { colors } = useTheme()
  return (
    <View style={{ ...styles.container, backgroundColor: colors.lighterBackground }}>
      <View style={{ width: '38.42%', borderRightColor: 'rgba(0,0,0,0.2)', borderRightWidth: 1 }}>
        <MyText style={styles.monthYear} fontStyle={FONT_CONST.medium}>
          {month} {year}
        </MyText>
        <MyText style={styles.dateStyles} fontStyle={FONT_CONST.extraBold}>
          {date}
        </MyText>
        <MyText style={styles.dayStyles} fontStyle={FONT_CONST.regular}>
          {day}
        </MyText>
      </View>
      <View style={styles.eventStyles}>
        <MyText style={{ fontWeight: '700', fontSize: 18 }} fontStyle={FONT_CONST.regular}>
          Sithi Cha: Hre
        </MyText>
        <MyText style={{ fontSize: 14, color: '424243' }} fontStyle={FONT_CONST.regular}>
          Jestha Krishna ChatuDarshi
        </MyText>
        <MyText>{eventData?.dotColor}</MyText>
      </View>
    </View>
  )
}

export default DayEvent

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 2,
    marginRight: 15,
    height: 200,
    width: '100%',
    paddingVertical: 20,
  },
  monthYear: {
    textAlign: 'center',
    fontSize: 18,
    color: '#1E1E1E',
    fontWeight: '800',
    lineHeight: 24.55,
  },
  dateStyles: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginVertical: 15,
  },
  dayStyles: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  eventStyles: {
    flex: 2,
    marginLeft: 20,
  },
})
