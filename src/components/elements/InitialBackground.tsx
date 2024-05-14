import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from 'constants/colors'
import { LinearGradient } from 'expo-linear-gradient'
import MyText from './MyText'

const BackgroundImage = () => {
  return (
    <View>
      <LinearGradient colors={['#4363C6', '#05A9C5']} style={styles.linearGradient}>
        <View>
          <Image source={require('assets/images/signInImage.jpg')} style={{ opacity: 0.05 }} />
        </View>
        <View style={styles.appLogo}>
          <Image source={require('assets/images/wenlogo.png')} />
        </View>
        <View style={styles.footerTextContainer}>
          <MyText style={styles.footerText}>
            Powered by <MyText style={styles.footerTextBold}>WebExperts</MyText>
          </MyText>
        </View>
      </LinearGradient>
    </View>
  )
}

export default BackgroundImage

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBlue,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    opacity: 0.6,
  },
  appLogo: {
    alignSelf: 'center',
    position: 'absolute',
    top: 300,
  },

  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  footerTextContainer: {
    position: 'absolute',
    bottom: 15,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  footerTextBold: {
    fontWeight: 'bold',
  },
})
