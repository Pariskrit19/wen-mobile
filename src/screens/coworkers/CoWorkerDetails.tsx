import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useRoute, useTheme } from '@react-navigation/native'
import CommonDetails from 'components/modules/CommonDetails'
import MyText from 'components/elements/MyText'
import Avatar from 'components/elements/Avatar'
import { FONT_CONST } from 'helpers/constants'

const CoWorkersDetails = () => {
  const route = useRoute<any>()
  const { user } = route.params
  const { colors } = useTheme()

  const userDetailKeys = [
    { name: 'role', title: 'Role' },
    { name: 'primaryPhone', title: 'Contact' },
    { name: 'officeStartTime', title: 'Office Start Time' },
    { name: 'officeEndTime', title: 'Office End Time' },
    { name: 'status', title: 'Status' },
    { name: 'lastReviewDate', title: 'Last Review Date' },
    { name: 'joinedDate', title: 'Joined Date' },
    { name: 'exitDate', title: 'Exit Date' },
  ]

  const userDetailValues = {
    role: user?.role,
    primaryPhone: user?.primaryPhone,
    officeStartTime: user?.officeStartTime,
    officeEndTime: user?.officeEndTime,
    status: user?.status,
    lastReviewDate: user?.lastReviewDate,
    joinedDate: user?.joinedDate,
    exitDate: user?.exitDate,
  }

  return (
    <View style={styles.main}>
      <View style={styles.overview}>
        <View style={[styles.circle, { backgroundColor: colors.avatarBg }]}>
          <Avatar image={user?.profile} imageStyles={styles.image} name={user?.name} />
        </View>
        <View style={styles.intro}>
          <MyText
            style={{ fontSize: 14, lineHeight: 16, color: '#05A9C5' }}
            fontStyle={FONT_CONST.rubikRegular}
            hasCustomColor
          >
            @{user?.username}
          </MyText>
          <MyText
            style={{ ...styles.title, color: colors.headerFont }}
            fontStyle={FONT_CONST.medium}
            hasCustomColor
          >
            {user?.name.toUpperCase()}
          </MyText>
          <MyText style={{ ...styles.position, color: colors.descriptionFont }} hasCustomColor>
            {user?.position}
          </MyText>
        </View>
      </View>
      <CommonDetails
        titles={userDetailKeys}
        fields={userDetailValues}
        cardStyle={styles.details}
        left="50%"
        right="50%"
      />
    </View>
  )
}

export default CoWorkersDetails

const styles = StyleSheet.create({
  main: {
    paddingTop: 30,
    flex: 1,
  },
  overview: {
    flexDirection: 'row',
    marginHorizontal: 12,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  intro: {
    marginLeft: 20,
    marginVertical: 14,
    width: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    color: '#000000',
    width: '65%',
  },
  position: {
    marginTop: 8,
    fontSize: 15,
    color: '#606060',
    fontWeight: '400',
    lineHeight: 18,
  },
  details: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 30,
  },
})
