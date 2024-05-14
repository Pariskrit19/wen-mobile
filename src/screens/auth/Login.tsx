import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SVGLogo from 'assets/svgs/Main.svg'
import LoginForm from 'components/elements/form/Login'
import KeyboardAvoidingComponent from '/components/elements/KeyboardDismissal'
import { Colors } from 'constants/colors'
import MyText from 'components/elements/MyText'
import { NavigationProp, useTheme } from '@react-navigation/native'
import Icon from 'components/elements/Icon'
import { useAppSelector } from 'redux/hook'
import { FONT_CONST } from 'helpers/constants'

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const { colors } = useTheme()
  return (
    <ScrollView
      style={{ backgroundColor: colors.secondBackground }}
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingComponent>
        <View style={{ flex: 1 }}>
          <View style={styles.logoContainer}>
            <Icon name={darkMode ? 'WENDARK' : 'WENLIGHT'} width="100%" height="70" />
          </View>
          <View style={styles.textContainer}>
            <MyText style={{ ...styles.boldText, color: colors.blackAndWhite }} hasCustomColor>
              Login to WEN APP
            </MyText>
            <MyText
              style={{ ...styles.normalText, color: colors.detailField }}
              fontStyle={FONT_CONST.rubikRegular}
              hasCustomColor
            >
              By Signing Up, you can avail full features of our services.
            </MyText>
          </View>
          <LoginForm navigation={navigation} />
        </View>
      </KeyboardAvoidingComponent>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 46,
    marginBottom: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryBlack,
    marginBottom: 21,
  },
  normalText: {
    fontSize: 14,
    color: '#767676',
    textAlign: 'center',
    paddingHorizontal: 48,
  },
})
