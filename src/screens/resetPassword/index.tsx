import * as React from 'react'
import { StyleSheet, View, SafeAreaView, Pressable, ActivityIndicator } from 'react-native'
import MyText from 'components/elements/MyText'
import ButtonEl from 'components/elements/Button'
import OTPComponent from 'components/elements/otpComponent'
import KeyboardAvoidingComponent from 'components/elements/KeyboardDismissal'
import CommonScreenHeader from 'components/elements/CommonScreenHeader'
import { useRoute, useTheme } from '@react-navigation/native'
import { FONT_CONST } from 'helpers/constants'
import { sendEmail, sendOtp } from 'services/resetpassword'
import { DashboardRoutes, NavigationRoutes } from 'constants/routes'
import { Colors } from 'constants/colors'
import { useMutation } from '@tanstack/react-query'
import { useToast } from 'react-native-toast-notifications'
import { commonToast } from 'helpers/utils'

const ResetPassword = ({ navigation }: { navigation: any }) => {
  const { colors } = useTheme()
  const toast = useToast()
  const [otpCode, setOTPCode] = React.useState<string>('')
  const [isPinReady, setIsPinReady] = React.useState<boolean>(false)
  const [newOtpId, setNewOtpId] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { mutate } = useMutation({
    mutationFn: (payload: { email: string }) => sendEmail({ email: payload.email, username: '' }),

    onSuccess: (res) => {
      if (res.status) {
        commonToast({
          toast: toast,
          message: res.message ?? 'OTP sent ! Please check your Email',
          type: 'success',
        })
        setNewOtpId(res.data.otpId)
      }
    },
  })
  const maximumCodeLength = 4
  const route = useRoute()
  const { email, otpId } = route.params
  const editedEmail = email.replace(email.substring(2, email.length - 22), '*********')

  const handleOtpSubmit = async () => {
    setIsLoading(true)
    const res = await sendOtp({ email, otp: otpCode, otpId: newOtpId ?? otpId })
    if (res.status) {
      navigation.navigate(DashboardRoutes.NewPassword, { email })
    } else {
      commonToast({
        toast: toast,
        message: res?.data?.message,
        type: 'danger',
      })
    }
    setIsLoading(false)
  }
  return (
    <KeyboardAvoidingComponent>
      <SafeAreaView style={{ backgroundColor: colors.secondBackground }}>
        <>
          <View>
            <CommonScreenHeader title="Reset Password" navigation={navigation} />
          </View>
          <View style={passwordStyle.container}>
            <MyText
              style={{
                textAlign: 'center',
                fontSize: 24,
                lineHeight: 32.74,
                color: colors.blackAndWhite,
              }}
              hasCustomColor
              fontStyle={FONT_CONST.extraBold}
            >
              Enter OTP Code
            </MyText>
            <MyText
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 14,
                color: colors.detailField,
              }}
              hasCustomColor
              fontStyle={FONT_CONST.rubikRegular}
            >
              We have just sent you a 4 digit code to {editedEmail}.
            </MyText>
            <OTPComponent setCode={setOTPCode} setIsPinReady={setIsPinReady} />
            <View style={passwordStyle.formContainer}>
              <ButtonEl
                disabled={!isPinReady || isLoading}
                onPress={handleOtpSubmit}
                title="CONTINUE"
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
              />
            </View>
            <View style={passwordStyle.footer}>
              <MyText
                style={{ ...passwordStyle.normalText, color: colors.descriptionFont }}
                hasCustomColor
                fontStyle={FONT_CONST.rubikRegular}
              >
                Didn't receive code?
              </MyText>
              <Pressable onPress={() => mutate({ email })}>
                <MyText style={passwordStyle.resetLink} hasCustomColor>
                  {' '}
                  Resend Code
                </MyText>
              </Pressable>
            </View>
          </View>
        </>
      </SafeAreaView>
    </KeyboardAvoidingComponent>
  )
}

const passwordStyle = StyleSheet.create({
  container: {
    marginTop: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    display: 'flex',
    height: '100%',
  },
  formText: {
    fontWeight: '700',
    fontSize: 19,
    marginBottom: 10,
  },
  normalText: {
    fontSize: 15,
    color: '#767676',
  },

  formContainer: {
    marginTop: 30,
    display: 'flex',
    rowGap: 20,
  },

  buttonStyle: {
    borderWidth: 0,
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
    marginVertical: 20,
  },
})

export default ResetPassword
