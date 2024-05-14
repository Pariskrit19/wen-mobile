import React from 'react'
import { View } from 'react-native'
import MyText from 'components/elements/MyText'
import Icon from 'components/elements/Icon'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'

type Props = {
  punchInOutTime?: string
  punchOutTime?: string
  punchText: string
  iconName: string
  isPunchIn?: boolean
}

const PunchInOutIcon = ({ punchInOutTime, punchText, iconName, isPunchIn }: Props) => {
  const { colors } = useTheme()
  return (
    <View style={{ alignItems: 'center', width: '33.2%' }}>
      <Icon name={iconName} height={30} width={30} />

      <MyText
        style={{ fontSize: 16, color: colors.subHeaderFont, fontWeight: '700', marginTop: 5 }}
        fontStyle={FONT_CONST.rubikMedium}
        hasCustomColor
      >
        {punchInOutTime || '--:--'}
      </MyText>
      <MyText
        style={{
          fontSize: 12,
          fontWeight: '400',
          color: colors.punchInOutTime,
          letterSpacing: 0.2,
        }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikRegular}
      >
        {punchText}
      </MyText>
    </View>
  )
}

export default PunchInOutIcon
