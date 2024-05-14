import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native'
import React from 'react'

const KeyboardAvoidingComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.pressable}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingComponent

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  pressable: {
    flex: 1,
  },
})
