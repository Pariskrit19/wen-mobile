import { NavigationProp, useTheme } from '@react-navigation/native'
import { StyleSheet, View, Pressable, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import FingerPrint from 'assets/svgs/FingerPrint.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from 'expo-checkbox'
import TextInputEl from '../TextInput'
import ButtonEl from 'components/elements/Button'
import { Colors } from 'constants/colors'
import SpecialButton from 'components/elements/SpecialButton'
import { NavigationRoutes } from 'constants/routes'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { setToken } from 'redux/reducer/initialLoadingSlice'
import MyText from 'components/elements/MyText'
import Icon from 'components/elements/Icon'
import useForm from 'hooks/useForm'
import { loginInUsers, loginWithFingerprint, storeExpoPushToken } from 'services/login'
import { FONT_CONST, NO_INTERNET, USER_BIOMETRIC_KEY } from 'helpers/constants'
import { setUserData } from 'redux/reducer/authSlice'
import { useToast } from 'react-native-toast-notifications'
import { authenticateAsync } from 'expo-local-authentication'
import * as Notifications from 'expo-notifications'
import { Env } from 'env'
import { commonToast } from 'helpers/utils'
import { useBiometric } from 'hooks/useBiometric'

const initialState = {
  username: { isRequired: true, value: '' },
  password: { isRequired: true, value: '' },
}

const REMEMBER_ME_KEY = 'remembered-username'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

const LoginForm = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const { colors } = useTheme()
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const [checkboxSelcted, setCheckboxSelected] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { isBiometricSupported, fingerprint, authenticationType } = useBiometric()
  const isPlatformAndroid = Platform.OS === 'android'
  const { onSubmit, onChange, onBlur, values, errors, clearValues, isSubmitting } = useForm(
    initialState,
    undefined,
    async () => {
      try {
        setIsLoading(true)

        if (checkboxSelcted) await AsyncStorage.setItem(REMEMBER_ME_KEY, values.username.value)

        const res = await loginInUsers({
          email: values?.username?.value?.trim().toLowerCase(),
          password: values.password.value,
        })

        if (res.status) {
          const isPushNotificationRegistered = await registerForPushNotificationsAsync(
            res?.data?.user._id
          )

          if (isPushNotificationRegistered) {
            dispatch(setUserData(res?.data?.user))
            await AsyncStorage.setItem('authUser', JSON.stringify(res?.data?.user || {}))
            await AsyncStorage.setItem('token', res.data.token)

            dispatch(setToken(res.data.token))
          } else {
            commonToast({
              toast: toast,
              message: 'Failed to login!',
              type: 'danger',
            })
          }
        } else {
          commonToast({
            toast: toast,
            message: res.message ?? 'Incorrect email or password',
            type: 'danger',
          })
        }
      } catch (e) {
        commonToast({
          toast: toast,
          message: 'Failed to login!',
          type: 'danger',
        })
      } finally {
        setIsLoading(false)
      }
    }
  )

  const showIcon = (
    <Pressable onPress={() => setHidePassword(true)}>
      <Icon width="18" height="30" name="ShowPassword" isFill fill={colors.iconColor} />
    </Pressable>
  )
  const notShowIcon = (
    <Pressable onPress={() => setHidePassword(false)}>
      <Icon width="20" height="30" name="HidePassword" isFill fill={colors.iconColor} />
    </Pressable>
  )

  const passwordIcon = hidePassword ? notShowIcon : showIcon

  const getRememberMe = async () => {
    const username = await AsyncStorage.getItem(REMEMBER_ME_KEY)

    if (username) onChange('username', username)
  }

  async function registerForPushNotificationsAsync(userId: string) {
    try {
      if (isPlatformAndroid) {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        toast.show('Turn notification on in settings and login again to get push notification!', {
          type: 'error',
        })
        return
      }
      const expoPushToken = await Notifications.getExpoPushTokenAsync({
        projectId: Env.eas.projectId,
      })
      await storeExpoPushToken({ userId, expoPushToken: expoPushToken.data })
      return true
    } catch (err) {
      return false
    }
  }

  const handleBiometric = async () => {
    if (isOffline) {
      return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    }
    const user = await AsyncStorage.getItem(USER_BIOMETRIC_KEY)

    if (!user) {
      return commonToast({
        toast: toast,
        message: isPlatformAndroid
          ? 'Fingerprint authentication disabled'
          : 'Facial authentication disabled',
        type: 'warning',
      })
    }

    if (!isBiometricSupported)
      return commonToast({
        toast: toast,
        message: 'Fingerprint not supported',
        type: 'error',
      })

    if (!fingerprint) {
      return commonToast({
        toast: toast,
        message: 'Fingerprint or facial authentication not setup in device',
        type: 'warning',
      })
    }

    const biometricResult = await authenticateAsync({
      disableDeviceFallback: true,
      promptMessage: 'Login with biometrics',
      cancelLabel: 'Cancel',
    })

    if (biometricResult?.success) {
      try {
        const res = await loginWithFingerprint(JSON.parse(user!))
        if (res.status) {
          dispatch(setUserData(res?.data?.user))
          await AsyncStorage.setItem('authUser', JSON.stringify(res?.data?.user || {}))
          await AsyncStorage.setItem('token', res.data.token)

          dispatch(setToken(res.data.token))
        } else {
          commonToast({
            toast: toast,
            message: res.message ?? 'Incorrect email or password',
            type: 'danger',
          })
        }
      } catch (e) {
        commonToast({
          toast: toast,
          message: 'Failed to login!',
          type: 'danger',
        })
      }
    }
  }

  useEffect(() => {
    getRememberMe()
  }, [])

  const handleSubmit = () => {
    if (isOffline) {
      return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    } else {
      onSubmit()
    }
  }

  return (
    <View style={styles.mainContainer}>
      <TextInputEl
        placeholder="Email or Username"
        keyboardType="email-address"
        onChangeText={(text) => onChange('username', text)}
        value={values.username.value}
        iconToLeft={true}
        icon={<Icon name="User" width={15} height={40} isFill fill={colors.iconColor} />}
        viewStyles={styles.inputs}
        error={errors.username}
      />
      <TextInputEl
        placeholder="Password"
        secure={hidePassword}
        onChangeText={(text) => onChange('password', text)}
        value={values.password.value}
        iconToLeft={true}
        icon={<Icon name="Lock" width={15} height={40} isFill fill={colors.iconColor} />}
        iconToRight={true}
        rightIcon={passwordIcon}
        viewStyles={{ ...styles.inputs, marginTop: 25 }}
        error={errors.password}
      />
      <Pressable
        style={styles.checkboxContainer}
        onPress={() => setCheckboxSelected((prev) => !prev)}
      >
        <CheckBox
          style={styles.checkBox}
          value={checkboxSelcted}
          onValueChange={() => setCheckboxSelected((prev) => !prev)}
          color={'#05A9C5'}
        />
        <MyText
          style={{ ...styles.normalText, color: colors.descriptionFont }}
          hasCustomColor
          fontStyle={FONT_CONST.rubikRegular}
        >
          Remember Me
        </MyText>
      </Pressable>
      <View style={styles.auth}>
        <View style={styles.signIn}>
          <ButtonEl
            onPress={handleSubmit}
            title={isLoading ? 'Signing In...' : 'SIGN IN'}
            btnTextColor="#FFF"
            btnTextBold={true}
            btnHeight={50}
            hasPressedEffect
            icon={isLoading ? <ActivityIndicator size="small" color="white" /> : undefined}
            iconToLeft
            hasIcon
            disabled={isLoading}
          />
        </View>
        <View style={styles.bio}>
          <SpecialButton onPress={handleBiometric} isSubmitting={isSubmitting}>
            <Icon
              name={authenticationType[0] === 2 ? 'faceId' : 'FingerPrint'}
              width={30}
              height={30}
              stroke={'white'}
              isFill={authenticationType[0] !== 2}
              isStroke={authenticationType[0] === 2}
              fill={'white'}
            />
          </SpecialButton>
        </View>
      </View>
      <View style={styles.footer}>
        <MyText
          style={{ ...styles.normalText, color: colors.descriptionFont }}
          hasCustomColor
          fontStyle={FONT_CONST.rubikRegular}
        >
          Forgot Password?
        </MyText>
        <Pressable onPress={() => navigation.navigate(NavigationRoutes.ResetPasswordForm)}>
          <MyText style={styles.resetLink} hasCustomColor>
            {' '}
            Reset Now
          </MyText>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 25,
  },
  normalText: {
    fontSize: 15,
    color: '#767676',
  },
  checkboxContainer: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginLeft: 10,
    marginTop: 15,
  },
  checkBox: {
    marginRight: 12,
    color: 'blue',
    width: 16,
    height: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  auth: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  signIn: {
    flex: 4,
  },
  bio: {
    flex: 1,
    width: 60,
  },
  resetLink: {
    textDecorationLine: 'underline',
    color: Colors.wenBlue,
    fontSize: 15,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputs: {
    borderRadius: 5,
    marginBottom: 0,
    borderWidth: 2,
  },
})
