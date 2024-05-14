import { NavigationProp } from '@react-navigation/native'
import HeaderBackButton from 'components/elements/HeaderBackButton'
import { fontFamilyType } from 'helpers/constants'
import { textColor } from 'styles/colors'

export const getCommonHeaderOptions = (
  navigation: NavigationProp<any, any>,
  darkMode: boolean
) => ({
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTitleStyle: {
    color: darkMode ? textColor : 'black',
    fontFamily: fontFamilyType['bold'],
  },
  headerLeft: (props: any) => <HeaderBackButton {...props} navigation={navigation} />,
})
