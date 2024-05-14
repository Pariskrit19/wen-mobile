import { useTheme } from '@react-navigation/native'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React from 'react'
import { View } from 'react-native'

const OfflineScreen = () => {
  const { colors } = useTheme()

  return (
    <View
      style={{
        marginVertical: 5,
        paddingVertical: 10,
        justifyContent: 'center',
        backgroundColor: colors.headerBackground,
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: '100%',
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Icon name="nowifi" width={40} height={40} isFill fill={'#05A9C5'} />
      </View>
      <View style={{ flex: 9, marginLeft: 15 }}>
        <MyText
          fontStyle={FONT_CONST.rubikMedium}
          style={{
            fontSize: 16,
            letterSpacing: 0.4,
          }}
        >
          Offline
        </MyText>
        <MyText
          fontStyle={FONT_CONST.rubikRegular}
          style={{
            fontSize: 14,
          }}
        >
          Your network is unavailable. Check your data or wifi connection.
        </MyText>
      </View>
    </View>
  )
}

export default OfflineScreen
