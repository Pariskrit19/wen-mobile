import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Months } from '@app/constants/DummyData/Months'
import MyText from 'components/elements/MyText'

const MonthSlider = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.main}>
        {Months.map((month) => (
          <Pressable
            style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
            key={month}
          >
            <MyText style={styles.months}>{month}</MyText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default MonthSlider

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
  },
  pressable: {
    marginHorizontal: 16,
    width: '90%',
    height: '70%',
    marginVertical: '10%',
    backgroundColor: 'white',
    borderRadius: 25,
    opacity: 0.9,
    top: -15,
  },
  pressed: {
    backgroundColor: '#4363C6',
  },
  months: {
    fontSize: 16,
  },
})
