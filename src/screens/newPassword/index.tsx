import { useRoute, useTheme } from '@react-navigation/native'
import ButtonEl from 'components/elements/Button'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import MyText from 'components/elements/MyText'
import PasswordInput from 'components/elements/form/PasswordInput'
import { NavigationRoutes } from 'constants/routes'
import { FONT_CONST, NO_INTERNET } from 'helpers/constants'
import { commonToast } from 'helpers/utils'
import useForm from 'hooks/useForm'
import * as React from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useAppSelector } from 'redux/hook'
import { UpdateUserPassword, createNewPassword } from 'services/resetpassword'
import { calendarWeedkendColor } from 'styles/colors'

const NewpasswordScreen = ({ navigation }: { navigation: any }) => {
  const { colors } = useTheme()
  const route = useRoute()
  // const { email } = route.params
  const [isLoading, setIsLoading] = React.useState(false)
  const toast = useToast()
  const [isMatchError, setIsMatchError] = React.useState(false)
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const initialState = {
    password: { isRequired: true, value: '' },
    confirmPassword: { isRequired: true, value: '' },
    currentPassword: { isRequired: !route?.params?.email, value: '' },
  }

  const { onSubmit, onChange, onBlur, values, errors, clearValues, isSubmitting } = useForm(
    initialState,
    undefined,
    async () => {
      try {
        if (values.currentPassword.value === values.confirmPassword.value) {
          return commonToast({
            toast: toast,
            message: 'current and new password must be different.',
            type: 'warning',
          })
        }
        setIsLoading(true)
        let res
        if (route?.params?.email) {
          res = await createNewPassword({
            password: values.password.value,
            passwordConfirm: values.confirmPassword.value,
            email: route?.params?.email,
          })
        } else {
          res = await UpdateUserPassword({
            password: values.password.value,
            passwordConfirm: values.confirmPassword.value,
            passwordCurrent: values.currentPassword.value,
          })
        }
        if (res?.status) {
          if (route?.params?.email) {
            navigation.navigate(NavigationRoutes.Login)
            toast.show('Password reset successfully.', { type: 'success' })
          } else {
            toast.show('Password Updated.', { type: 'success' })
            navigation.goBack()
          }
        } else {
          setIsLoading(false)
          commonToast({
            toast: toast,
            message: res?.message || 'Could not update password',
            type: 'danger',
          })
        }
      } catch (error) {
        commonToast({
          toast: toast,
          message: error?.message || 'Could not update password',
          type: 'danger',
        })
      }
    }
  )
  const handlePasswordChange = async () => {
    if (isOffline) return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    if (values?.password?.value !== values?.confirmPassword?.value) {
      setIsMatchError(true)
    } else {
      setIsMatchError(false)
      onSubmit()
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.secondBackground }}
      automaticallyAdjustKeyboardInsets
    >
      <SafeAreaView>
        <View>
          <CommonScreenHeader title="New Password" navigation={navigation} />
        </View>
        <View style={passwordStyle.container}>
          <MyText
            style={{ ...passwordStyle.boldText, color: colors.blackAndWhite }}
            fontStyle={FONT_CONST.bold}
            hasCustomColor
          >
            Create New Password
          </MyText>

          <MyText
            style={{ ...passwordStyle.disclaimerText, color: colors.detailField }}
            fontStyle={FONT_CONST.rubikRegular}
            hasCustomColor
          >
            Your new password must be different from previous used password
          </MyText>

          <View style={passwordStyle.formContainer}>
            {!route?.params?.email && (
              <View>
                <MyText
                  style={{ ...passwordStyle.formText, color: colors.subHeaderFont }}
                  hasCustomColor
                  fontStyle={FONT_CONST.rubikMedium}
                >
                  Current Password
                </MyText>
                <PasswordInput
                  onChangeText={(value) => onChange('currentPassword', value)}
                  placeholder="8 characters at least"
                  value={values.currentPassword.value}
                  error={errors.currentPassword}
                />
              </View>
            )}
            <View>
              <MyText
                style={{ ...passwordStyle.formText, color: colors.subHeaderFont }}
                hasCustomColor
                fontStyle={FONT_CONST.rubikMedium}
              >
                New Password
              </MyText>
              <PasswordInput
                onChangeText={(value) => onChange('password', value)}
                placeholder="8 characters at least"
                value={values.password.value}
                error={errors.password}
              />
            </View>

            <View>
              <MyText
                style={{ ...passwordStyle.formText, color: colors.subHeaderFont }}
                hasCustomColor
                fontStyle={FONT_CONST.rubikMedium}
              >
                Confirm Password
              </MyText>
              <PasswordInput
                onChangeText={(value) => onChange('confirmPassword', value)}
                placeholder="Confirm Password"
                value={values.confirmPassword.value}
                error={errors.confirmPassword}
              />
              {isMatchError && (
                <MyText
                  style={{ color: calendarWeedkendColor }}
                  fontStyle={FONT_CONST.rubikRegular}
                  hasCustomColor
                >
                  Must match Password
                </MyText>
              )}
            </View>

            <ButtonEl
              onPress={handlePasswordChange}
              title="RESET PASSWORD"
              styles={passwordStyle.buttonStyle}
              btnTextColor={'#ffffff'}
              color={'#05A9C5'}
              btnHeight={50}
              fontSize={16}
              fontWeight={'500'}
              hasPressedEffect
              icon={isLoading ? <ActivityIndicator size="small" color="white" /> : undefined}
              iconToLeft
              hasIcon
              disabled={isLoading}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const passwordStyle = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 25,
    display: 'flex',
    flex: 1,
  },
  boldText: { textAlign: 'center', fontSize: 26, marginBottom: 10 },
  disclaimerText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#424243',
  },
  formText: {
    fontSize: 14,
    marginBottom: 10,
  },

  formContainer: {
    marginTop: 30,
    display: 'flex',
    rowGap: 20,
  },

  buttonStyle: {
    marginTop: 10,
    borderWidth: 0,
    borderRadius: 5,
  },
})

export default NewpasswordScreen
