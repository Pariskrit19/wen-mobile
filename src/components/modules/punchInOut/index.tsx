import { StyleSheet, View, Image, Platform } from 'react-native'
import React from 'react'
import MyText from 'components/elements/MyText'
import Icon from 'components/elements/Icon'
import { useAppSelector } from 'redux/hook'
import { FONT_CONST } from 'helpers/constants'
import { useAssets } from 'expo-asset'

type PunchIconText = {
  insideText?: string
  navText?: string
  iconStyles?: Object
  gradientStyles?: Object
  width?: string
  height?: string
  colors?: string[]
}

const PunchInoutButton = ({ insideText, navText, iconStyles }: PunchIconText) => {
  const { isPunchIn } = useAppSelector((state) => state?.attendance)
  const [assets, error] = useAssets([
    require('../../../assets/images/PunchInOut.png'),
    require('../../../assets/images/PunchOutImage.png'),
  ])
  return (
    <View>
      <View style={{ ...styles.circle, ...iconStyles }}>
        {insideText ? (
          <Icon name="punch-in-out" width={90} height={90} />
        ) : (
          <Image
            style={styles.image}
            src={isPunchIn ? assets?.[1]?.localUri : assets?.[0]?.localUri}
          />
        )}

        {insideText && <MyText style={styles.insideText}>{insideText}</MyText>}
      </View>
      {navText && (
        <MyText
          style={{ ...styles.text, marginTop: Platform.OS === 'ios' ? 39 : 37 }}
          fontStyle={FONT_CONST.rubikRegular}
        >
          {navText}
        </MyText>
      )}
    </View>
  )
}

export default PunchInoutButton

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  text: {
    marginTop: 37,
    fontSize: 10,
    color: '#000',
  },
  iconStyle: {
    position: 'relative',
    right: 4,
    bottom: 2,
  },
  insideText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '700',
  },
  image: {
    width: 80,
    height: 80,
  },
})
