import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaintenanceIcon from 'assets/svgs/Maintenance.svg'
import MyText from 'components/elements/MyText'
import { useTheme } from '@react-navigation/native'

const Maintenance = () => {
  const { colors } = useTheme()

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <MyText style={{ ...styles.title1, color: colors.headerFont }}>
          The site currently down for maintenance
        </MyText>
        <MyText style={{ ...styles.title2, color: colors.subHeaderFont }}>
          We apologize for any inconvenience caused. Meanwhile you can reload the page or try again
          later
        </MyText>
        <MaintenanceIcon style={{ width: 20 }} />
      </View>
    </View>
  )
}

export default Maintenance

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
  },
  title1: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    fontSize: 20,
  },
  title2: {
    color: 'white',
    opacity: 0.7,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 17,
  },
})
