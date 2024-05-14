import MyText from 'components/elements/MyText'
import { Colors } from 'constants/colors'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Image, Modal, Pressable, Text, Platform } from 'react-native'
import ProfileInfo from 'components/modules/profiles/ProfileInfo'
import { NavigationRoutes } from 'constants/routes'
import { NavigationProp, useTheme } from '@react-navigation/native'
import Avatar from 'components/elements/Avatar'
import Icon from 'components/elements/Icon'
import { DashboardRoutes } from 'constants/routes/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { setToken } from 'redux/reducer/initialLoadingSlice'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import DarkModeModal from 'components/modules/dashboard/DarkModeModal'
import { FONT_CONST, NO_INTERNET, USER_BIOMETRIC_KEY } from 'helpers/constants'
import { logoutUser } from 'services/login'
import { setUserData } from 'redux/reducer/authSlice'
import { setPunchInDatas } from 'redux/reducer/attendanceSlice'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { authenticateAsync } from 'expo-local-authentication'
import { useToast } from 'react-native-toast-notifications'
import { useBiometric } from 'hooks/useBiometric'
import { commonToast } from 'helpers/utils'

const ProfileScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const isoffline = useAppSelector((state) => state?.common?.isOffline)
  const queryClient = useQueryClient()
  const toast = useToast()
  const { isBiometricSupported, fingerprint, authenticationType } = useBiometric()
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.snapToIndex(0)
  }, [])

  useEffect(() => {
    const getBitometircStatus = async () => {
      const user = await AsyncStorage.getItem(USER_BIOMETRIC_KEY)
      if (user) {
        setIsSwitchOn(true)
      } else {
        setIsSwitchOn(false)
      }
    }
    getBitometircStatus()
  }, [])

  const handleBiometric = async (val: boolean) => {
    if (isoffline) return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    const user = await AsyncStorage.getItem(USER_BIOMETRIC_KEY)
    // check if user has biometric setup
    if (user) {
      const biometricResult = await authenticateAsync({
        disableDeviceFallback: true,
        promptMessage: 'Remove biometrics login',
        cancelLabel: 'Cancel',
      })
      if (biometricResult?.success) {
        await AsyncStorage.removeItem(USER_BIOMETRIC_KEY)
        toast.show('Removed biometric login', { type: 'success' })
        setIsSwitchOn(val)
      }
      return
    }
    // check for hardware support
    if (!isBiometricSupported) {
      return commonToast({
        toast: toast,
        message: Platform.OS === 'ios' ? 'Face Id not supported' : 'Fingerprint not supported',
        type: 'error',
      })
    }

    // check if fingerprint or facial authentication is setup in device settings
    if (!fingerprint) {
      return commonToast({
        toast: toast,
        message: 'Fingerprint or facial authentication not setup in device',
        type: 'warning',
      })
    }
    const biometricResult = await authenticateAsync({
      disableDeviceFallback: true,
      promptMessage: 'Enable biometric login',
      cancelLabel: 'Cancel',
    })

    if (biometricResult?.success) {
      await AsyncStorage.setItem(USER_BIOMETRIC_KEY, JSON.stringify(authUser))
      setIsSwitchOn(val)
      toast.show('Succesfully setup biometric', { type: 'success' })
    }
  }

  const handleLogout = async () => {
    setIsSubmitting(true)
    if (isoffline) return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    if (isSubmitting) {
      return
    }
    try {
      const res = await logoutUser()
      if (res.status) {
        dispatch(setToken(''))
        await AsyncStorage.setItem('token', '')
        await AsyncStorage.setItem('authUser', '')
        dispatch(setUserData({}))
        dispatch(setPunchInDatas({}))

        queryClient.clear()
      } else {
        commonToast({ toast: toast, message: 'Failed to logout.', type: 'warning' })
      }
      setIsSubmitting(false)
    } catch (err) {
      setIsSubmitting(false)
      console.log(err)
    }
  }

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={[profileStyles.container, { backgroundColor: colors.secondBackground }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={profileStyles.infoContainer}>
          <View style={{ ...profileStyles.imageContainer, backgroundColor: colors.avatarBg }}>
            <Avatar
              image={authUser?.photoURL}
              imageStyles={profileStyles.image}
              name={authUser?.name}
            />
          </View>

          <View style={profileStyles.nameWrapper}>
            <MyText
              fontStyle={FONT_CONST.bold}
              style={{ textTransform: 'uppercase', fontSize: 22, color: colors.blackAndWhite }}
              hasCustomColor
            >
              {authUser?.name}
            </MyText>
            <MyText
              fontStyle={FONT_CONST.rubikRegular}
              hasCustomColor={true}
              style={{ color: Colors.wenBlue, fontSize: 15 }}
            >
              {authUser?.positionType?.name}
            </MyText>
          </View>
        </View>

        <View
          style={{
            ...profileStyles.Wrapper,
            ...profileStyles.shadow,
            ...profileStyles.uniformMarginTop,
            backgroundColor: colors.headerBackground,
          }}
        >
          <ProfileInfo
            icon={<Icon name="Mobile" width={30} height={30} isFill fill={colors.semiIconColor} />}
            text1={'Phone Number'}
            text2={authUser?.primaryPhone}
            extraStyles={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
          />

          <ProfileInfo
            icon={
              <Icon name="Email" width={30} height={30} isStroke stroke={colors.semiIconColor} />
            }
            text1={'Email'}
            text2={authUser?.email}
          />
        </View>
        <View style={profileStyles.uniformMarginTop}>
          <MyText
            fontStyle={FONT_CONST.bold}
            hasCustomColor
            style={{ ...profileStyles.headerStyles, color: colors.blackAndWhite }}
          >
            General
          </MyText>
          <View
            style={{
              ...profileStyles.Wrapper,
              ...profileStyles.shadow,
              marginTop: 10,
              backgroundColor: colors.headerBackground,
            }}
          >
            <ProfileInfo
              hasIcon={true}
              icon={
                <Icon
                  name="DarkModeSwitch"
                  width={30}
                  height={30}
                  isFill
                  fill={colors.semiIconColor}
                />
              }
              text1={'Appearance'}
              text2={'Choose your light or dark theme'}
              // extraStyles={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
              onPress={handlePresentModalPress}
            />
          </View>
        </View>

        <View style={profileStyles.uniformMarginTop}>
          <MyText
            fontStyle={FONT_CONST.bold}
            hasCustomColor
            style={{ ...profileStyles.headerStyles, color: colors.blackAndWhite }}
          >
            Basic Information
          </MyText>
          <View
            style={{
              ...profileStyles.Wrapper,
              ...profileStyles.shadow,
              marginTop: 10,
              backgroundColor: colors.headerBackground,
            }}
          >
            <ProfileInfo
              hasIcon={true}
              icon={<Icon name="User" width={25} height={25} isFill fill={colors.semiIconColor} />}
              text1={'My Information'}
              text2={'View your basic information'}
              extraStyles={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
              onPress={() => navigation.navigate(NavigationRoutes?.MyInformation)}
            />

            <ProfileInfo
              icon={
                <Icon name="Logout" width={25} height={25} isFill fill={colors.semiIconColor} />
              }
              text1={'Logout'}
              text2={'Logout of this app'}
              hasIcon={true}
              onPress={handleLogout}
              isSubmitting={isSubmitting}
            />
          </View>
        </View>

        <View style={profileStyles.uniformMarginTop}>
          <MyText
            fontStyle={FONT_CONST.bold}
            hasCustomColor
            style={{ ...profileStyles.headerStyles, color: colors.blackAndWhite }}
          >
            Security Settings
          </MyText>
          <View
            style={{
              ...profileStyles.Wrapper,
              ...profileStyles.shadow,
              marginTop: 10,
              backgroundColor: colors.headerBackground,
            }}
          >
            <ProfileInfo
              icon={<Icon name="Lock" width={30} height={30} isFill fill={colors.semiIconColor} />}
              text1={'Change Password'}
              text2={'Change Password'}
              extraStyles={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
              hasIcon={true}
              onPress={() => navigation.navigate(DashboardRoutes.NewPassword)}
            />

            <ProfileInfo
              icon={
                <Icon
                  name={authenticationType[0] === 2 ? 'faceId' : 'FingerPrint'}
                  width={30}
                  height={30}
                  stroke={colors.semiIconColor}
                  isFill={authenticationType[0] !== 2}
                  isStroke={authenticationType[0] === 2}
                  fill={colors.semiIconColor}
                />
              }
              text1={'Setup Biometrics'}
              text2={'Setup Biometrics'}
              hasSwitch
              onSwitchChange={handleBiometric}
              isSwitchOn={isSwitchOn}
            />
          </View>
        </View>

        <View style={{ height: 45 }}></View>
      </ScrollView>
      <DarkModeModal bottomSheetModalRef={bottomSheetModalRef} />
    </BottomSheetModalProvider>
  )
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 5,
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  nameWrapper: {
    display: 'flex',
    width: '65%',
  },
  Wrapper: {
    marginTop: 10,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 10,
      height: 0,
    },
    marginHorizontal: 5,
    shadowRadius: 2,
    elevation: 5,
  },
  uniformMarginTop: {
    marginTop: 30,
  },
  headerStyles: {
    fontSize: 14,
    marginLeft: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
})

export default ProfileScreen
