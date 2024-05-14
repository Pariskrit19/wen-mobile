import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from './Icon'
import MyText from './MyText'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'
import ButtonEl from './Button'

type Props = {
  isFilterPresent?: boolean
  hasSearch?: boolean
  handleFilterReset?: Function
  title?: string
  style?: any
}

const NotFound = ({
  title = 'No Result Found',
  isFilterPresent = false,
  hasSearch = false,
  handleFilterReset,
  style,
}: Props) => {
  const { colors } = useTheme()
  return (
    <View style={{ ...styles.notFound, backgroundColor: colors.headerBackground, ...style }}>
      <Icon
        containerStyles={{ ...styles.iconStyle, backgroundColor: colors.dropdownboxColor }}
        name="notFound"
        width={50}
        height={50}
        color="black"
        isFill
        fill={'white'}
      />
      <MyText fontStyle={FONT_CONST.rubikRegular} style={{ marginTop: 20 }}>
        {title}
      </MyText>
      {hasSearch && (
        <MyText
          fontStyle={FONT_CONST.rubikRegular}
          hasCustomColor
          style={{
            textAlign: 'center',
            marginHorizontal: 5,
            color: colors.projectListValueField,
          }}
        >
          Try adjusting your search or filter options to find what you're looking for.
        </MyText>
      )}
      {isFilterPresent && handleFilterReset && (
        <ButtonEl
          title="CLEAR FILTERS"
          onPress={handleFilterReset}
          btnWidth={'50%'}
          hasIcon
          iconToLeft
          btnTextBold
          fontSize={14}
          btnTextColor="white"
          styles={{ marginTop: 10 }}
          isAnimated
        />
      )}
    </View>
  )
}

export default NotFound

const styles = StyleSheet.create({
  notFound: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    borderRadius: 10,
  },
  iconStyle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
