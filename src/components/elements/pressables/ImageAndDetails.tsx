import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import MyText from '../MyText'
import Icon from '../Icon'
import { DashboardRoutes } from 'constants/routes'
import { FONT_CONST } from 'helpers/constants'
import SuperScriptDateFormtter from '../SuperScriptDateFormtter'
import { getUpcomingActivitiesDateFormate } from 'utils'

interface ItemProps {
  id: string
  title: string
  date: string
  endDate: string
  image: string
  remaining: string
  type: string
  time: string
  endtime: string
  details: string
}

const ImageAndDetails = ({ item }: { item: ItemProps }) => {
  const { colors } = useTheme()
  const navigation: NavigationProp<any> = useNavigation()
  return (
    <Pressable
      style={[
        styles.main,
        {
          backgroundColor: colors.upComingActivitiesBg,
          borderColor: colors.cardBorder,
        },
      ]}
      onPress={() =>
        navigation.navigate(DashboardRoutes.NoticeDetails, {
          title: item.title,
          startDate: item.date,
          endDate: item.endDate,
          category: item.type,
          startTime: item?.time,
          endTime: item?.endtime,
          details: item.details,
          imageURL: item?.image,
        })
      }
    >
      <View style={styles.body}>
        <View style={{ ...styles.square, marginLeft: Platform.OS === 'ios' ? 0 : -2 }}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={{ width: 75, height: 75 }} />
          ) : (
            <Icon name="Notice" width={40} height={40} />
          )}
        </View>
        <View style={styles.details}>
          <SuperScriptDateFormtter date={item?.date} />
          <MyText
            style={{ ...styles.title, color: colors.subHeaderFont }}
            fontStyle={FONT_CONST.medium}
            hasCustomColor
            numberOfLines={1}
          >
            {item.title}
          </MyText>
          <MyText hasCustomColor={true} style={styles.remaining} fontStyle={FONT_CONST.rubikItalic}>
            {item.remaining}
          </MyText>
        </View>
      </View>
      <Icon
        name="KeyboardRightArrow"
        width={6}
        height={15}
        containerStyles={{ position: 'relative', right: 0, top: 8, left: 14 }}
      />
    </Pressable>
  )
}

export default ImageAndDetails

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    marginHorizontal: 3,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: '#EEEEEE',
    backgroundColor: 'blue',
    paddingRight: 24,
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 76,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.7 },
  body: {
    flexDirection: 'row',
    gap: 10,
    height: 75,
  },
  square: {
    // backgroundColor: 'rgba(66, 66, 67, 0.11)',
    backgroundColor: '#fff',
    width: 75,
    height: 74,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: -2,
  },
  details: {
    paddingTop: 8,
    paddingBottom: 0,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1E1E1E',
    width: 180,
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
  },
  remaining: {
    fontSize: 10,
    color: '#05A9C5',
    fontStyle: 'italic',
    marginBottom: 4,
  },
})
// const dynamicStyles = colors =>
//   StyleSheet.create({
//     main: {
//       borderWidth: 1,
//       marginHorizontal: 3,
//       borderRadius: 4,
//       borderColor: colors.border,
//       backgroundColor: colors.background,
//       paddingRight: 24,
//       marginRight: 12,
//       marginVertical: 10,
//     },
//     title: {
//       fontWeight: '500',
//       fontSize: 14,
//       color: colors.text,
//     },
//   });
