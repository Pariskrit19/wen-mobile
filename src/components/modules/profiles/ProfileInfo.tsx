import MyText from 'components/elements/MyText'
import React from 'react'
import { StyleSheet, View, ViewStyle, Pressable, Switch } from 'react-native'
import { GestureResponderEvent } from 'react-native-modal'
import Icon from 'components/elements/Icon'
import { FONT_CONST } from 'helpers/constants'
import { useTheme } from '@react-navigation/native'
import { backgroundColor } from 'styles/colors'

type IProfileInfo = Partial<{
  icon: any
  text1: string
  text2: string
  extraStyles: ViewStyle
  hasIcon: Boolean
  onPress: (event: GestureResponderEvent) => void
  hasSwitch?: boolean
  onSwitchChange: (val: boolean) => void
  isSwitchOn?: boolean
}>

const ProfileInfo = ({
  icon,
  text1,
  text2,
  extraStyles,
  hasIcon = false,
  onPress,
  hasSwitch = false,
  isSwitchOn,
  onSwitchChange,
}: IProfileInfo) => {
  const { colors } = useTheme()

  return (
    <Pressable
      // style={[styles.container, extraStyles]}
      style={({ pressed }) => [
        // pressed && {
        //   backgroundColor: 'rgba(131, 128, 129, 0.27)',
        // },
        styles.container,
        { height: 80 },
        extraStyles,
      ]}
      onPress={onPress}
      disabled={!hasIcon}
    >
      <View style={{ ...styles.innerWrapper }}>
        <View style={{ minWidth: 35, alignSelf: 'center' }}>{icon}</View>
        <View>
          <MyText
            fontStyle={FONT_CONST.rubikMedium}
            style={{ fontSize: 16, color: '#1E1E1E', color: colors.headerFont }}
            hasCustomColor
          >
            {text1}
          </MyText>
          <MyText
            // hasCustomColor={true}
            fontStyle={FONT_CONST.rubikRegular}
            style={{ fontSize: 14, marginTop: 2, color: colors.descriptionFont }}
            hasCustomColor
          >
            {text2}
          </MyText>
        </View>
      </View>

      {hasSwitch && (
        <Switch
          trackColor={{ true: colors.primary, false: 'grey' }}
          thumbColor={backgroundColor}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(val) => onSwitchChange && onSwitchChange(val)}
          style={{ marginRight: 10 }}
          value={isSwitchOn}
        />
      )}

      {hasIcon && (
        <Icon
          name="KeyboardRightArrow"
          width={18}
          height={16}
          color="#424243"
          containerStyles={{ marginRight: 10 }}
        />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 23,
    // alignItems: 'center',
  },
})

export default ProfileInfo
// box-shadow: 0px 2px 15px 0px #0000001A;
