import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'

type Props = {
  priority?: boolean
}

const SwitchSelect = ({ priority }: Props) => {
  return (
    <View style={styles.container}>
      <SwitchSelector
        disabled
        initial={priority ? 0 : 1}
        onPress={() => {}}
        textColor={'white'} //'#7a44cf'
        selectedColor={'white'}
        textStyle={{ ...styles.textStyle, ...(priority ? styles.rightStyle : styles.leftStyle) }}
        selectedTextContainerStyle={styles.textStyle}
        buttonMargin={13}
        buttonColor={'white'}
        style={styles.switchStyles}
        backgroundColor={priority ? 'rgba(5, 169, 197, 0.8)' : 'rgba(255, 89, 127, 0.8)'}
        borderColor={priority ? 'rgba(5, 169, 197, 0.8)' : 'rgba(255, 89, 127, 0.8)'}
        hasPadding
        options={[
          { label: 'No', value: 'm' }, //images.masculino = require('./path_to/assets/img/masculino.png')
          { label: 'Yes', value: 'f' }, //images.feminino = require('./path_to/assets/img/feminino.png')
        ]}
        testID="gender-switch-selector"
        accessibilityLabel="gender-switch-selector"
      />
    </View>
  )
}

export default SwitchSelect

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -16,
    width: 55,
    height: 24,
  },
  switchStyles: {
    transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
    width: '63%',
  },
  textStyle: {
    fontSize: 25,
    marginBottom: 4,
  },
  leftStyle: {
    marginLeft: 20,
    paddingLeft: 5,
  },
  rightStyle: {
    marginRight: 16,
    paddingRight: 5,
  },
})
