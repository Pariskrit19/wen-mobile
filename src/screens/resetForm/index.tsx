import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native'
import MyText from 'components/elements/MyText'
import TextInputEl from 'components/elements/form/TextInput'
import ButtonEl from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import KeyboardAvoidingComponent from 'components/elements/KeyboardDismissal'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import { FONT_CONST, NO_INTERNET } from 'helpers/constants'
import useForm from 'hooks/useForm'
import { sendEmail } from 'services/resetpassword'
import { NavigationRoutes } from 'constants/routes'
import { useTheme } from '@react-navigation/native'
import { useToast } from 'react-native-toast-notifications'
import { useAppSelector } from 'redux/hook'
import { commonToast } from 'helpers/utils'

const initialState = {
  email: { isRequired: true, value: '' },
  username: { isRequired: false, value: '' },
}

const ResetForm = ({ navigation }: { navigation: any }) => {
  const { colors } = useTheme()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const handleSubmit = () => {
    if (isOffline) {
      return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    } else {
      onSubmit()
    }
  }

  const { onSubmit, onChange, onBlur, values, errors, clearValues, isSubmitting } = useForm(
    initialState,
    undefined,
    async () => {
      setIsLoading(true)
      const res = await sendEmail({ email: values.email.value, username: values.username.value })

      if (res.status) {
        commonToast({
          toast: toast,
          message: res.message ?? 'OTP sent ! Please check your Email',
          type: 'success',
        })
        navigation.navigate(NavigationRoutes.ResetPassword, {
          email: values.email.value.trim().toLowerCase(),
          otpId: res.data.otpId,
        })
      } else {
        commonToast({
          toast: toast,
          message: (res.data?.message || res.message) ?? 'Could not send OTP to your email account',
          type: 'danger',
        })
      }

      setIsLoading(false)
    }
  )

  return (
    <KeyboardAvoidingComponent>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View>
          <View>
            <CommonScreenHeader title="Reset Password" navigation={navigation} />
          </View>
          <View style={passwordStyle.container}>
            <View style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 65 }}>
              <Icon width={90} height={90} name="Lock" isFill fill={colors.iconColor} />
            </View>

            <MyText
              style={{ fontSize: 24, lineHeight: 32.74, color: colors.blackAndWhite }}
              hasCustomColor
              fontStyle={FONT_CONST.bold}
            >
              Email & Username
            </MyText>
            <View style={passwordStyle.formContainer}>
              <TextInputEl
                onChangeText={(text) => onChange('email', text)}
                value={values.email.value}
                iconToLeft={true}
                icon={
                  <Icon
                    name="AtTheRate"
                    size={20}
                    color="black"
                    isStroke
                    stroke={colors.iconColor}
                  />
                }
                placeholder="Email Address"
                viewStyles={{ marginVertical: 0 }}
                error={errors.email}
              />

              <TextInputEl
                onChangeText={(text) => onChange('username', text)}
                value={values.username.value}
                icon={<Icon name="User" size={20} color="black" isFill fill={colors.iconColor} />}
                iconToLeft={true}
                placeholder="Username"
                viewStyles={{ marginVertical: 0, marginTop: 10 }}
                error={errors.username}
              />

              <MyText
                style={{
                  fontSize: 14,
                  color: colors.descriptionFont,
                  lineHeight: 21,
                  marginTop: 10,
                }}
                fontStyle={FONT_CONST.rubikRegular}
                hasCustomColor
              >
                You will receive a 4 digit verification code to your email address for password
                reset.
              </MyText>

              <ButtonEl
                onPress={handleSubmit}
                title={isLoading ? 'SENDING...' : 'SEND'}
                styles={passwordStyle.buttonStyle}
                btnTextColor={'#ffffff'}
                color={'#05A9C5'}
                btnHeight={50}
                fontSize={16}
                fontWeight={'700'}
                icon={isLoading ? <ActivityIndicator size="small" color="white" /> : undefined}
                iconToLeft
                hasIcon
                hasPressedEffect
                disabled={isLoading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingComponent>
  )
}

const passwordStyle = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    display: 'flex',
  },
  formText: {
    fontWeight: '700',
    fontSize: 19,
    marginBottom: 10,
  },
  InfoText: {
    color: 'grey',
  },
  formContainer: {
    display: 'flex',
    marginTop: 15,
  },

  buttonStyle: {
    marginTop: 35,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ResetForm
