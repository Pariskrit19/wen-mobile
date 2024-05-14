import MonthDaysDate from 'components/modules/attendances/MonthDaysDate'
import LiveTime from 'components/elements/LiveTime'
import MyText from 'components/elements/MyText'
import React, { useRef, useState } from 'react'
import { View, StyleSheet, Pressable, ScrollView, Dimensions, RefreshControl } from 'react-native'
import * as Location from 'expo-location'
import * as Network from 'expo-network'
import PunchInOutIcon from 'components/modules/attendances/PunchInOutIcon'
import Icon from 'components/elements/Icon'
import { NavigationProp, useTheme } from '@react-navigation/native'
import LatePunchInModal from 'components/modules/attendances/LatePunchInModal'
import HistoryAttendanceModal from 'components/modules/attendances/HistoryAttendanceModal'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { addAttendance, getLocationName, getMaintenance, updatePunchout } from 'services/attendance'
import { checkIfTimeISBetweenOfficeHour, commonToast, milliSecondIntoHours } from 'helpers/utils'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { setPunchInDatas } from 'redux/reducer/attendanceSlice'
import { LinearGradient } from 'expo-linear-gradient'
import { FONT_CONST, NO_INTERNET } from 'helpers/constants'
import { useToast } from 'react-native-toast-notifications'
import useForm from 'hooks/useForm'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import { useRefresh } from 'hooks/useRefresh'

type Props = {
  openModal: boolean
  handleModal: () => void
  navigation: NavigationProp<any, any>
}

const PunchInOutScreen = ({ openModal, handleModal, navigation }: Props) => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const queryClient = useQueryClient()
  const { colors } = useTheme()
  const toast = useToast()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const locationRef = useRef(undefined)
  const [formSubmitting, setFromSubmitting] = useState(false)
  const {
    isPunchIn,
    lastPunchId,
    punchInTime,
    punchOutTime,
    totalWorkingHours,
    lastPunchIn,
    location: userLocation,
  } = useAppSelector((state: any) => state?.attendance)
  const { refreshing, onRefresh } = useRefresh({ keysToRevalidate: ['userAttendance'] })

  const initialState = {}

  const handleAttendanceSubmit = async (punchNote?: string, midDayExit?: boolean) => {
    if (isOffline) {
      return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    }
    setFromSubmitting(true)
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      const ipAdd = await Network.getIpAddressAsync()
      if (status !== 'granted') {
        setSubmitting(false)
        return commonToast({
          toast: toast,
          message: 'Permission to access location was denied',
          type: 'warning',
          styles: { backgroundColor: '#038fde' },
        })
      }

      const location = await Location.getCurrentPositionAsync({})
      const latitude = location.coords.latitude
      const longitude = location.coords.longitude
      const locationName = await getLocationName(latitude, longitude)

      locationRef.current = locationName?.title || locationName?.address?.label
      if (punchInTime && !punchOutTime) {
        punchOutAttendances.mutate({
          userId: lastPunchId,
          payload: {
            punchOutNote: punchNote,
            midDayExit: midDayExit,
            punchOutTime: moment.utc().format(),
            punchOutLocation: [latitude, longitude],
            punchOutIp: ipAdd,
          },
        })
      } else {
        addAttendances.mutate({
          punchInTime: moment.utc().format(),
          punchInLocation: [latitude, longitude],
          attendanceDate: moment.utc().startOf('day').format(),
          punchInIp: ipAdd,
          punchInNote: punchNote,
        })
      }
    } catch (err) {
      setSubmitting(false)
      commonToast({ toast: toast, message: 'Punch Failed!', type: 'danger' })
    } finally {
      setFromSubmitting(false)
      bottomSheetModalRef.current?.dismiss()
    }
  }

  const { onSubmit, onChange, onBlur, values, errors, clearValues, isSubmitting, setSubmitting } =
    useForm(initialState, undefined, async () => await handleAttendanceSubmit())
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const { data: configurations, refetch: configurationRefetch } = useQuery(
    ['configuration'],
    getMaintenance,
    {
      select: (data) => ({
        lateArrivalThreshold: data?.data?.data?.[0]?.lateArrivalThreshold,
        officeHour: data?.data?.data?.[0]?.officeHour,
      }),
      enabled: !isOffline,
    }
  )

  useRefreshOnFocus([configurationRefetch])

  const addAttendances = useMutation((payload: any) => addAttendance(payload), {
    onSuccess: (response) => {
      if (response?.status) {
        //dispatch from here instead of invalidating
        const res = response?.data?.data
        toast.show('Punched Successfully', { type: 'success' })
        dispatch(
          setPunchInDatas({
            isPunchIn: true,
            lastPunchId: res?._id,
            punchInTime: punchInTime ?? moment(res?.punchInTime).format('HH:mm')?.split(' ')?.[0],
            punchOutTime: undefined,
            totalWorkingHours: totalWorkingHours,
            lastPunchIn: res?.punchInTime,
            location: locationRef.current,
          })
        )
        queryClient.invalidateQueries(['userAttendance'])
      } else {
        setSubmitting(false)
        commonToast({ toast, message: response?.message || 'Punch Failed!', type: 'danger' })
      }
    },
    onError: (error) => {
      setSubmitting(false)
      commonToast({ toast, message: 'Punch Failed!', type: 'danger' })
    },
    onSettled: () => {
      clearValues()
    },
  })

  const punchOutAttendances = useMutation(
    (payload: any) => updatePunchout(payload?.userId, payload?.payload),
    {
      onSuccess: (response) => {
        if (response.status) {
          const res = response?.data?.data
          const punchOutTime = moment(res?.punchOutTime).format('HH:mm')?.split(' ')?.[0]
          toast.show('Punched Successfully!', { type: 'success' })
          dispatch(
            setPunchInDatas({
              isPunchIn: false,
              lastPunchId: res?._id,
              punchInTime: punchInTime,
              punchOutTime: punchOutTime,
              totalWorkingHours:
                (totalWorkingHours ? +totalWorkingHours : 0) +
                moment(res?.punchOutTime).diff(moment(res?.punchInTime)),
              lastPunchIn: res?.punchInTime,
              location: locationRef.current,
            })
          )
          queryClient.invalidateQueries(['userAttendance'])
        } else {
          setSubmitting(false)
          commonToast({ toast, message: response?.message || 'Punch Failed!', type: 'warning' })
        }
      },
      onError: (error) => {
        setSubmitting(false)
        commonToast({ toast, message: 'Punch Failed!', type: 'warning' })
      },
      onSettled: () => {
        clearValues()
      },
    }
  )

  const handlePunchInOut = async () => {
    if (isOffline) {
      return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    }
    if (lastPunchIn && moment() < moment(lastPunchIn).add(10, 'm')) {
      return commonToast({
        toast: toast,
        message: 'You just punched in !',
        type: 'warning',
        styles: { backgroundColor: '#038fde' },
      })
    }
    if (
      checkIfTimeISBetweenOfficeHour(
        moment(authUser?.officeTime?.utcDate)
          .add(configurations?.lateArrivalThreshold, 'm')
          .format('HH:mm:ss'),
        moment(authUser?.officeEndTime).format('HH:mm:ss')
      )
    ) {
      bottomSheetModalRef.current?.snapToIndex(0)
      return
    } else {
      onSubmit()
    }
  }

  const getButtonText = () => {
    if (isPunchIn) {
      return formSubmitting ? 'PUNCHING OUT' : 'PUNCH OUT'
    } else {
      return formSubmitting ? 'PUNCHING IN' : 'PUNCH IN'
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View
        style={{
          ...styles.conatiner,
          backgroundColor: colors.secondBackground,
        }}
      >
        {openModal && (
          <HistoryAttendanceModal
            handleModal={handleModal}
            openModal={openModal}
            navigation={navigation}
          />
        )}

        <LatePunchInModal
          onSubmit={handleAttendanceSubmit}
          buttonText={getButtonText()}
          title={isPunchIn ? 'Punch Out Note' : 'Punch In Note'}
          bottomSheetModalRef={bottomSheetModalRef}
          isPunchIn={isPunchIn}
        />

        <View style={styles.timeDate}>
          <LiveTime
            format="HH:mm"
            timeStyles={{ ...styles.timeStyles, color: colors.headerFont }}
          />
          <MonthDaysDate />
        </View>
        <View style={styles.iconLocation}>
          <Pressable
            onPress={handlePunchInOut}
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.9 : 1 }}
          >
            <LinearGradient
              colors={isPunchIn ? ['#89309A', '#4363C6'] : ['#4363C6', '#45D1E6']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                justifyContent: 'center',
                overflow: 'hidden',
                elevation: 10,
                shadowRadius: 5,
                shadowColor: '#4363C6',
                shadowOffset: {
                  width: -10,
                  height: 0,
                },
                shadowOpacity: 0.4,
              }}
            >
              <Icon
                name="punchHand"
                height={82}
                width={67}
                containerStyles={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <MyText
                style={{
                  textAlign: 'center',
                  marginTop: 15,
                  color: 'white',
                  fontSize: 14,
                }}
                hasCustomColor
                fontStyle={FONT_CONST.bold}
              >
                {isPunchIn ? 'PUNCH OUT' : 'PUNCH IN'}
              </MyText>
            </LinearGradient>
          </Pressable>

          {punchInTime && (
            <View style={styles.location}>
              <Icon name="location" width={16} height={16} isFill fill={colors.iconColor} />
              <MyText
                style={{ ...styles.locationText, color: colors.descriptionFont }}
                hasCustomColor
                fontStyle={FONT_CONST.rubikRegular}
              >
                {userLocation || locationRef.current}
              </MyText>
            </View>
          )}
        </View>
        <View style={styles.iconTimes}>
          <PunchInOutIcon
            iconName="punchInClock"
            isPunchIn
            punchInOutTime={punchInTime || ''}
            punchText="Punch In"
          />
          <PunchInOutIcon
            iconName="punchOutClock"
            punchText="Punch Out"
            punchInOutTime={punchOutTime || ''}
          />
          <PunchInOutIcon
            iconName="workingHourClock"
            // punchInOutTime={!isPunchIn ? totalWorkingHours : ''}
            punchInOutTime={
              !isPunchIn && totalWorkingHours ? milliSecondIntoHours(totalWorkingHours) : ''
            }
            punchText="Working Hours"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default PunchInOutScreen

const styles = StyleSheet.create({
  conatiner: {
    justifyContent: 'center',
    flex: 1,
  },
  timeDate: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 116,
  },
  timeStyles: {
    fontSize: 42,
  },
  gradientStyles: {
    borderRadius: 100,
    height: 200,
    width: 200,
  },
  iconLocation: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 42,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    width: '80%',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#606060',
    textAlign: 'center',
  },
  iconTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 12,
    marginTop: 60,
  },
  modalStyles: {
    flex: 1,
    position: 'absolute',
    height: 50,
    right: 10,
    top: 40,
    padding: 10,
    paddingHorizontal: 15,
    elevation: 10,
    borderRadius: 10,
  },
})
