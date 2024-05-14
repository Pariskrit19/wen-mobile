import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import Avatar from '../Avatar'
import { useTheme } from '@react-navigation/native'
import { FONT_CONST } from 'helpers/constants'

interface BirthdayProps {
  id: string
  title: string
  date: string
  profile?: string
  remaining: string
}

const BirthdayWidget = ({ item }: { item: BirthdayProps }) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        ...styles.main,
        backgroundColor: colors.semiCardBackground,
        borderColor: colors.cardBorder,
      }}
    >
      <View style={styles.body}>
        <View style={[styles.square, { backgroundColor: colors.avatarBg }]}>
          <Avatar image={item?.profile} imageStyles={styles.imageStyle} name={item.title} />
        </View>
        <View style={styles.details}>
          <MyText
            style={{ ...styles.title, color: colors.subHeaderFont }}
            fontStyle={FONT_CONST.rubikRegular}
            numberOfLines={1}
            hasCustomColor
          >
            {item.title}
          </MyText>
          <MyText
            style={{ ...styles.date, color: colors.descriptionFont }}
            hasCustomColor
            fontStyle="bold"
          >
            {item.date}
          </MyText>
          <MyText style={styles.remaining} fontStyle="bold" hasCustomColor>
            {item.remaining}
          </MyText>
        </View>
      </View>
    </View>
  )
}

export default BirthdayWidget

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    marginHorizontal: 3,
    borderRadius: 5,
    marginRight: 12,
    width: 200,
    padding: 7,
    height: 62,
  },
  body: {
    flexDirection: 'row',
    columnGap: 8,
  },
  details: {
    width: '73%',
  },
  square: {
    width: 46,
    height: 46,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
  },
  date: {
    fontSize: 11,
    color: '#606060',
  },
  remaining: {
    fontSize: 8,
    color: '#05A9C5',
    marginBottom: 4,
    textAlign: 'right',
  },
  imageStyle: {
    width: '100%',
    height: 46,
    borderRadius: 5,
  },
})
