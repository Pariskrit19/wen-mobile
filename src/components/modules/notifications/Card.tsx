import { Image, Pressable, StyleSheet, View } from 'react-native'
import MyText from 'components/elements/MyText'
import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'components/elements/Icon'
import { useTheme } from '@react-navigation/native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { DashboardRoutes, LeaveRoutes, NavigationRoutes } from 'constants/routes'
import { FONT_CONST } from 'helpers/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNotification } from 'services/notifications'
import { useAppSelector } from 'redux/hook'
import { useToast } from 'react-native-toast-notifications'
import { commonToast } from 'helpers/utils'
import * as WebBrowser from 'expo-web-browser'
import { Env } from '../../../env'
import FullDate from 'components/elements/FullDate'

interface NoticeProps {
  id: number
  title: string
  date: string
  type: string
  time?: string
  image?: string
  showDelete?: boolean
  TypeIcon: string
  typeColor: any
  typeTextColor: any
  details: any
  startTime?: string
  endTime?: string
  endDate: string
}

const NotificationCard = ({
  id,
  title,
  date,
  type,
  image,
  time,
  showDelete = false,
  TypeIcon,
  typeColor,
  typeTextColor,
  startTime,
  endTime,
  details,
  endDate,
}: NoticeProps) => {
  const { colors } = useTheme()
  const toast = useToast()
  const navigation: NavigationProp<any> = useNavigation()
  const queryClient = useQueryClient()
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const mutation = useMutation(deleteNotification, {
    onSuccess: (res) => {
      if (res.status) {
        queryClient.invalidateQueries(['notificationInfo'])
        toast.show('Notification Deleted.', { type: 'success' })
      } else {
        commonToast({ toast: toast, message: 'Deletion Failed!', type: 'danger' })
      }
    },
    onError: (error) => commonToast({ toast: toast, message: 'Deletion Failed!', type: 'danger' }),
  })

  const handleNoticeNavigation = async () => {
    let notificationRoute
    if (!showDelete)
      notificationRoute = navigation.navigate(DashboardRoutes.NoticeDetails, {
        title,
        startDate: date,
        endDate: endDate || date,
        category: type,
        startTime: startTime || '_ _',
        endTime: endTime || '_ _',
        details,
        imageURL: image,
      })
    else if (type === 'Leave' || type === 'Attendance')
      notificationRoute = navigation.navigate(NavigationRoutes.Leaves, {
        screen: LeaveRoutes.Leaves,
        params: {
          isFromNotification: true,
        },
      })
    else if (type === 'Blog') {
      await WebBrowser.openBrowserAsync(Env.BLOG_URL)
    } else {
      navigation.navigate(DashboardRoutes.NoticeBoard)
    }
    return notificationRoute
  }

  const RenderRightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    })
    return (
      <View style={{ justifyContent: 'center', marginLeft: 12 }}>
        <Pressable
          onPress={() =>
            mutation.mutate({
              userId: authUser?._id,
              role: authUser?.role?.key,
              notificationId: id,
            })
          }
        >
          <Icon
            name="recycle"
            width={22}
            height={22}
            color="white"
            containerStyles={styles.containerStyle}
          />
        </Pressable>
      </View>
    )
  }
  const isLongEvent = endDate && new Date(date).getTime() !== new Date(endDate).getTime()
  return (
    <Swipeable renderRightActions={showDelete && RenderRightActions}>
      <Pressable onPress={handleNoticeNavigation}>
        <View>
          <View
            style={[
              styles.root,
              // { width: width - 20 },
              { backgroundColor: colors.headerBackground },
            ]}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 35,
                }}
              />
            ) : (
              <View style={styles.backupView}>
                <View
                  style={[styles.defaultImage, { backgroundColor: colors.iconBackground }]}
                ></View>
                <View style={styles.notifyIcon}>
                  <Icon
                    name={TypeIcon}
                    width={35}
                    height={35}
                    // stroke={'red'}
                    // stroke={colors.notificationIcons}
                    fill={colors.notificationIcons}
                    isFill
                  />
                </View>
              </View>
            )}
            <View style={{ width: '79%' }}>
              <MyText
                style={{ ...styles.title, color: colors.headerFont }}
                hasCustomColor
                fontStyle={FONT_CONST.rubikMedium}
              >
                {title}
              </MyText>
              {isLongEvent ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FullDate
                    data={date}
                    fontStyle={FONT_CONST.rubikRegular}
                    color={colors.punchInOutTime}
                    fontSize={11}
                    isShort={true}
                  />
                  <MyText style={{ color: colors.punchInOutTime, height: 23 }}> - </MyText>
                  <FullDate
                    data={endDate}
                    fontStyle={FONT_CONST.rubikRegular}
                    color={colors.punchInOutTime}
                    fontSize={11}
                    isShort={true}
                  />
                </View>
              ) : (
                <FullDate
                  data={date}
                  fontStyle={FONT_CONST.rubikRegular}
                  color={colors.punchInOutTime}
                  fontSize={11}
                />
              )}

              <View
                style={[
                  styles.typeView,
                  {
                    backgroundColor: showDelete
                      ? colors.noticeTypeBackground
                      : type === 'Event'
                      ? colors.noticeBoardBackground
                      : colors.attendanceWeekend,
                  },
                ]}
              >
                <MyText
                  style={{
                    ...styles.type,
                    color: showDelete
                      ? colors.noticeTypeText
                      : type === 'Event'
                      ? colors.noticeEventType
                      : colors.attendanceWeekendText,
                  }}
                  hasCustomColor={true}
                >
                  {type}
                </MyText>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Swipeable>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: -18,
    marginVertical: 6,
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    elevation: 4,
    shadowRadius: 5,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    zIndex: 999,
  },
  backupView: {
    flexDirection: 'row',
  },
  defaultImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyIcon: {
    position: 'relative',
    right: 48,
    top: 12,
  },
  title: {
    fontSize: 15,
    marginBottom: 6,
    paddingRight: 12,
  },
  date: {
    fontSize: 11,
    color: '#606060',
  },
  typeView: {
    alignItems: 'center',
    backgroundColor: '#E6ECFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 11,
  },
  type: {
    fontSize: 12,
    color: '#4E63C6',
    fontWeight: '600',
  },
  containerStyle: {
    backgroundColor: '#c21042',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
