import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import MyText from './MyText'
import Icon from './Icon'
import { FONT_CONST } from 'helpers/constants'

interface Info {
  title: string
  CustomPressable: any
  data: any[]
  iconName?: string
  iconWidth?: string
  iconHeight?: string
  options?: any
  containerStyle?: Object
  backupText?: string
}
const HorizontalContainer = ({
  title,
  CustomPressable,
  iconName,
  data,
  iconHeight,
  iconWidth,
  options,
  containerStyle,
  backupText,
}: Info) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.main, containerStyle, { backgroundColor: colors.headerBackground }]}>
      <View style={styles.mainHeader}>
        <View style={styles.title}>
          {iconName && (
            <Icon
              width={iconWidth ?? 25}
              height={iconHeight ?? 20}
              name={iconName}
              isFill
              fill={colors.iconColor}
            />
          )}
          <MyText
            style={{ ...styles.titleText, color: colors.headerFont }}
            hasCustomColor
            fontStyle={FONT_CONST.extraBold}
          >
            {title}
          </MyText>
        </View>
        {options && options}
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.pressables}>
          {!data || data.length === 0 ? (
            <View style={styles.backupText}>
              <MyText>{backupText}</MyText>
            </View>
          ) : (
            data?.map((item) => (
              <View key={item.id}>
                <CustomPressable item={item} />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default HorizontalContainer

const styles = StyleSheet.create({
  main: {
    paddingLeft: 12,
    borderRadius: 10,
    paddingBottom: 14,
  },
  titleText: {
    fontSize: 16,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 16,
    marginBottom: 15,
  },
  pressables: {
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
  },
  backupText: {
    marginLeft: 34,
  },
})

// const dynamicStyles = colors =>
//   StyleSheet.create({
//     main: {
//       backgroundColor: colors.background,
//       padding: 8,
//       gap: 12,
//       paddingBottom: 16,
//     },
//     titleText: {
//       fontWeight: '700',
//       color: colors.text,
//     },
//   });
