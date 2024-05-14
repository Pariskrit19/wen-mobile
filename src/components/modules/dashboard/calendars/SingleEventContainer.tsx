import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import MyText from 'components/elements/MyText'
import Icon from 'components/elements/Icon'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'
import { noticeDateFormat } from 'helpers/utils'

export default function SingleEventContainer({ item, isClick }: { item: any; isClick: boolean }) {
  const { colors } = useTheme()
  const isHoliday = item?.type === 'Holiday'
  return (
    <View
      style={{
        marginHorizontal: isClick ? 15 : 25,
        marginTop: 20,
        // marginBottom: 15,
      }}
      key={item?._id}
    >
      {item?.image && (
        <Image
          style={{
            width: '100%',
            paddingHorizontal: 20,
            height: 150,
            marginBottom: 15,
          }}
          resizeMode="contain"
          source={{
            uri: item?.image,
          }}
        />
      )}
      <View style={styles.rowStyles}>
        <View
          style={{ ...styles.rectangleStyle, backgroundColor: isHoliday ? '#c16262' : '#4D97E1' }}
        ></View>
        <View style={{ width: '95%' }}>
          <MyText style={styles.titleText} fontStyle={FONT_CONST.rubikRegular}>
            {item?.title}
          </MyText>
          <MyText
            style={{ ...styles.rightText, width: '100%' }}
            fontStyle={FONT_CONST.rubikRegular}
          >
            {noticeDateFormat({ date: item?.date })}
          </MyText>
        </View>
      </View>
      <View style={{ ...styles.rowStyles }}>
        <Icon
          name={isHoliday ? 'holidayDashboardIcon' : 'upcomingActivities'}
          width={25}
          height={25}
          isFill
          fill={colors.iconColor}
        />
        <MyText
          style={{ ...styles.rightText, width: isClick ? '85%' : '90%' }}
          fontStyle={FONT_CONST.rubikRegular}
        >
          {item?.type}
        </MyText>
      </View>
      <View style={styles.rowStyles}>
        <Icon
          name="description"
          width={25}
          height={25}
          isFill
          fill={colors.iconColor}
          containerStyles={{
            paddingTop: 5,
          }}
        />
        <MyText
          style={{
            ...styles.rightText,
            width: isClick ? '85%' : '90%',
            textAlign: 'justify',
          }}
          fontStyle={FONT_CONST.rubikRegular}
        >
          {item?.details}
        </MyText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyles: {
    marginBottom: 25,
    flexDirection: 'row',
  },
  rectangleStyle: {
    height: 20,
    width: 20,
    backgroundColor: '#50cebb',
    borderRadius: 5,
  },
  rightText: {
    fontSize: 15,
    marginLeft: 15,
    width: '90%',
  },
  titleText: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 5,
    marginLeft: 15,
    width: '90%',
  },
})
