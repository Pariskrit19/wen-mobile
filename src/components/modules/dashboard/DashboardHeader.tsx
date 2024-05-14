import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { ParamListBase, useFocusEffect, useNavigation, useTheme } from '@react-navigation/native'
import { DashboardRoutes } from 'constants/routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppSelector } from 'redux/hook'
import Avatar from 'components/elements/Avatar'
import Icon from 'components/elements/Icon'
import { socket } from '../../../../App'
import MyText from 'components/elements/MyText'

export const DashboardHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { colors } = useTheme()
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const [notificationCount, setNotificationCount] = useState<number>(0)

  const authUser = useAppSelector((state) => state?.auth?.authUser)

  const userNotificationEventHandler = (response) => {
    if (response && response?.showTo?.includes(authUser?._id)) {
      setNotificationCount((prev) => prev + 1)
    }
  }

  const notificationEventHandler = (response) => {
    if (response && response?.showTo?.includes(authUser?.role?.key)) {
      setNotificationCount((prev) => prev + 1)
    }
  }

  useFocusEffect(
    useCallback(() => {
      socket.emit('get-notification-count', {
        _id: authUser?._id,
        key: authUser?.role?.key,
        joinDate: authUser?.joinDate,
      })

      socket.once('bell-notification', notificationEventHandler)

      socket.once('bell-notification-for-user', userNotificationEventHandler)

      socket.on('send-notViewed-notification-count', (response) => {
        setNotificationCount(response)
      })
    }, [authUser?.role?.key, authUser?._id, notificationCount])
  )

  useEffect(() => {
    return () => {
      socket.off('bell-notification-for-user', userNotificationEventHandler)
      socket.off('bell-notification', notificationEventHandler)
    }
  }, [notificationCount])

  return (
    <View
      style={[
        styles.mainHeader,
        {
          backgroundColor: colors.headerBackground,
          borderBottomWidth: 1,
          borderBottomColor: colors.headerBorder,
        },
      ]}
    >
      <View style={{ marginLeft: 2 }}>
        <Icon name={darkMode ? 'WENDARK' : 'WENLIGHT'} width={125} height={50} />
      </View>
      <View style={styles.miniLogoContainer}>
        <Pressable
          style={styles.notification}
          onPress={() => navigation.navigate(DashboardRoutes.Notifications)}
        >
          <Icon name="Notifications" width={15} height={18} containerStyles={styles.notifyIcon} />

          <View
            style={{
              position: 'relative',
              top: -10,
              backgroundColor: notificationCount ? '#f44336' : 'transparent',
              width: 20,
              height: 20,
              left: 2,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MyText
              style={{
                fontSize: 10,
                color: 'white',
                alignSelf: 'center',
              }}
            >
              {!!notificationCount ? notificationCount : false}
            </MyText>
          </View>
        </Pressable>

        <Pressable
          style={{ ...styles.imageContainer, backgroundColor: colors.avatarBg }}
          onPress={() => {
            setNotificationCount(0)
            navigation.navigate(DashboardRoutes.MyProfile)
          }}
        >
          <Avatar
            image={authUser?.photoURL}
            name={authUser?.name}
            imageStyles={styles.image}
            isDashboard
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  miniLogoContainer: {
    flexDirection: 'row',
    gap: 13,
    paddingHorizontal: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    top: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  notification: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 18,
    top: 1,
  },
  newNotification: {
    position: 'relative',
    right: 0,
    bottom: 16,
  },
  notifyIcon: {
    marginLeft: 8,
    alignSelf: 'center',
    position: 'relative',
    left: 6,
  },
})

// const dynamicStyles = (colors) =>
//   StyleSheet.create({
//     mainHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingHorizontal: 6,
//       backgroundColor: colors.background,
//       alignItems: 'flex-end',
//     },
//   })
