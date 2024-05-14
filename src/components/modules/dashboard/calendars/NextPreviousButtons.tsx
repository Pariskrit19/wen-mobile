import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'components/elements/Icon'

const NextPreviousButtons = ({
  onNextPress,
  onPreviousPress,
  hideNextButton,
}: {
  onNextPress: () => void
  onPreviousPress: () => void
  hideNextButton: boolean
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 60,
      }}
    >
      <Pressable onPress={onPreviousPress}>
        <Icon
          name="KeyboardRightArrow"
          containerStyles={{
            transform: 'rotate(180deg)',
          }}
          width={25}
          height={25}
          isFill
          fill=""
        />
      </Pressable>

      <Pressable onPress={onNextPress}>
        <Icon
          name="KeyboardRightArrow"
          width={25}
          height={25}
          isFill
          fill={hideNextButton ? 'grey' : ''}
        />
      </Pressable>
    </View>
  )
}

export default NextPreviousButtons

const styles = StyleSheet.create({})
