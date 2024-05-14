import { Pressable, StyleSheet, Text, View, Image, Platform } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import { CoWorkersRoute } from 'constants/routes'
import { CoWorkerData } from 'screens/coworkers'
import MyText from '../MyText'
import Avatar from '../Avatar'
import { FONT_CONST } from 'helpers/constants'

const CoWorker = ({ item }: { item: CoWorkerData }) => {
  const navigation: NavigationProp<any> = useNavigation()
  const { colors } = useTheme()
  return (
    <Pressable
      style={[
        styles.main,
        {
          backgroundColor: colors.headerBackground,
          shadowColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)',
        },
      ]}
      onPress={() => navigation.navigate(CoWorkersRoute.CoWorkerDetails, { user: item })}
    >
      <View style={styles.body}>
        <View style={[styles.circle, { backgroundColor: colors.avatarBg }]}>
          <Avatar image={item.profile} imageStyles={styles.image} name={item.name} />
        </View>
        <View style={styles.details}>
          <MyText
            style={{ ...styles.title, color: colors.subHeaderFont }}
            fontStyle={FONT_CONST.medium}
            hasCustomColor
            numberOfLines={1}
          >
            {item.name}
          </MyText>
          <MyText style={{ ...styles.date, color: colors.descriptionFont }} hasCustomColor>
            {item.position}
          </MyText>
        </View>
      </View>
    </Pressable>
  )
}

export default CoWorker

const styles = StyleSheet.create({
  main: {
    borderRadius: 8,
    paddingRight: 24,
    marginBottom: 5,
    padding: 10,
    paddingBottom: 10,
    marginHorizontal: 12,
    marginTop: 5,
    elevation: 5,
    shadowRadius: 8,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    zIndex: 999,
  },
  body: {
    flexDirection: 'row',
    gap: 16,
  },
  details: {
    gap: 2,
    paddingTop: 4,
    width: '80%',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
  },
  date: {
    fontSize: 13,
  },
})
