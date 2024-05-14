import { Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import MyText from './MyText'
import { NavigationProp, useTheme } from '@react-navigation/native'
import BackButton from './BackButton'
import { backgroundColor } from 'styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import LeaveBackButton from 'components/modules/leaves/LeaveBackButton'

interface ScreenHeaderProps {
  title: string
  navigation: NavigationProp<any, any>
  headerRight?: React.ReactNode
  isFromLeave?: Boolean
}

const CommonScreenHeader = ({ title, navigation, headerRight, isFromLeave }: ScreenHeaderProps) => {
  const { width } = useWindowDimensions()
  const { colors } = useTheme()

  const fontStyle = Platform.OS === 'ios' ? 'bold' : 'medium'
  return (
    <SafeAreaView>
      <View
        style={[
          styles.header,
          { backgroundColor: colors.headerBackground, borderBottomColor: colors.headerBorder },
        ]}
      >
        {isFromLeave ? (
          <LeaveBackButton navigation={navigation} />
        ) : (
          <BackButton navigation={navigation} />
        )}
        <View style={[styles.titleContainer, { width: width - 90 }]}>
          <MyText
            style={{ ...styles.title, color: colors.headerFont }}
            hasCustomColor
            fontStyle={'bold'}
            numberOfLines={1}
          >
            {title}
          </MyText>
        </View>
        {headerRight && <View>{headerRight}</View>}
      </View>
    </SafeAreaView>
  )
}

export default CommonScreenHeader

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: backgroundColor,
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
})
