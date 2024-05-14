import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import Avatar from '../Avatar'
import { useTheme } from '@react-navigation/native'
import { backgroundColor } from 'styles/colors'
import { FONT_CONST } from 'helpers/constants'

interface UsersOnLeaveProps {
  id: string
  title: string
  date: string
  profile?: string
  duration: string
}

const LeaveWidget = ({ item }: { item: UsersOnLeaveProps }) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        ...styles.main,
        borderColor: colors.cardBorder,
        backgroundColor: colors.semiCardBackground,
      }}
    >
      <View style={styles.body}>
        <View style={[styles.square, { backgroundColor: colors.avatarBg }]}>
          <Avatar
            image={item?.profile}
            imageStyles={{ width: 42, height: 42, borderRadius: 21 }}
            name={item.title}
          />
        </View>
        <View style={styles.details}>
          <MyText
            style={{ ...styles.title, color: colors.subHeaderFont }}
            fontStyle={FONT_CONST.rubikMedium}
            trim
            numberLimit={20}
            numberOfLines={1}
            hasCustomColor
          >
            {item.title}
          </MyText>
          <MyText style={styles.duration} fontStyle={FONT_CONST.rubikRegular} hasCustomColor>
            {item.duration} {item?.name === 'Late Arrival' ? '(Late)' : ''}
          </MyText>
        </View>
      </View>
    </View>
  )
}

export default LeaveWidget

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 7,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 190,
    height: 64,
    paddingVertical: 10,
  },
  body: {
    flexDirection: 'row',
    columnGap: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    paddingVertical: 7,
  },
  square: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    width: 120,
  },
  date: {
    fontSize: 11,
  },
  duration: {
    fontSize: 8,
    color: '#05A9C5',
    marginTop: 5,
  },
})
