import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Ionicons from '@expo/vector-icons/AntDesign'
import MyText from './MyText'
import { useTheme } from '@react-navigation/native'
import { FONT_CONST } from 'helpers/constants'
// import Icon from 'react-native-vector-icons/AntDesign';

type IconType = {
  icon: any
  focused: Boolean
  title: String
  isDisabled?: Boolean
}

const CustomIcon = ({ icon, focused, title, isDisabled }: IconType) => {
  const { colors } = useTheme()

  return (
    <View>
      <Ionicons
        name={icon}
        size={30}
        color={focused ? 'blue' : isDisabled ? '#256f7b' : '#05A9C5'}
        style={styles.icons}
      />
      <MyText
        style={{
          ...styles.text,
          color: isDisabled ? colors.descriptionFont : colors.headerFont,
          marginTop: Platform.OS === 'ios' ? 8 : 5,
        }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikRegular}
      >
        {title}
      </MyText>
    </View>
  )
}

export default CustomIcon

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    color: 'black',
    alignSelf: 'center',
    marginTop: 5,
  },
  icons: {
    alignSelf: 'center',
  },
})
