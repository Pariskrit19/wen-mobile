import React from 'react'
import { StyleSheet, View } from 'react-native'
import MyText from 'components/elements/MyText'
import { useTheme } from '@react-navigation/native'
import { FONT_CONST } from 'helpers/constants'
import { ScrollView } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import FullDate from 'components/elements/FullDate'
import ButtonEl from 'components/elements/Button'
import * as WebBrowser from 'expo-web-browser'
interface titleProps {
  name: string
  title: string
  type?: string
}

interface DetailProps {
  detailTitle?: string
  titles: titleProps[]
  fields: any
  cardStyle?: object
  right?: string
  left?: string
  isURL?: boolean
}

const CommonDetails = ({
  titles,
  fields,
  detailTitle,
  cardStyle,
  left,
  right,
  isURL = false,
}: DetailProps) => {
  const { colors } = useTheme()

  return (
    <ScrollView style={{ marginHorizontal: 12 }} showsHorizontalScrollIndicator={false}>
      {detailTitle && (
        <MyText
          style={{ ...styles.heading, color: colors.headerFont }}
          hasCustomColor
          fontStyle={FONT_CONST.rubikMedium}
        >
          {detailTitle}
        </MyText>
      )}
      <View
        style={[
          styles.main,
          { marginTop: !detailTitle ? 25 : 15, marginBottom: 20 },
          cardStyle,
          { backgroundColor: colors.headerBackground, borderColor: colors.calendarHeaderBorder },
        ]}
      >
        {isURL && fields.imageURL && (
          <Image
            style={{
              width: '100%',
              height: 180,
              marginBottom: 15,
            }}
            resizeMode="contain"
            source={{
              uri: fields.imageURL,
            }}
          />
        )}
        {titles?.map((item) => (
          <View style={styles.container} key={item.name}>
            <MyText
              style={{ ...styles.title, color: colors.subHeaderFont, width: left ? left : '41.6%' }}
              hasCustomColor
              fontStyle={FONT_CONST.rubikMedium}
            >
              {item.title}
            </MyText>
            {item.type === 'date' ? (
              <FullDate data={fields[item.name]} color={colors.detailField} isShort />
            ) : item?.name === 'documentFile' ? (
              fields['documentFile'] ? (
                <ButtonEl
                  title="View File"
                  btnWidth={'50%'}
                  btnHeight={45}
                  fontSize={15}
                  btnTextColor="white"
                  onPress={async () => await WebBrowser.openBrowserAsync(fields[item.name])}
                />
              ) : (
                <MyText
                  fontStyle={FONT_CONST.rubikRegular}
                  hasCustomColor
                  style={{
                    ...styles.field,
                    color: colors.detailField,
                    width: right ? right : '58.37%',
                  }}
                >
                  _ _
                </MyText>
              )
            ) : (
              <MyText
                fontStyle={FONT_CONST.rubikRegular}
                hasCustomColor
                style={{
                  ...styles.field,
                  color: colors.detailField,
                  width: right ? right : '58.37%',
                }}
              >
                {fields[item.name] ?? '_ _'}
              </MyText>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default CommonDetails

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'grey',

    paddingHorizontal: 20,
    paddingTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 15,
  },
  heading: {
    marginTop: 25,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    lineHeight: 20,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 14,
    paddingRight: 10,
    color: '#1E1E1E',
  },
  field: {
    paddingRight: 2,
    fontSize: 14,
    color: '#424243',
    alignSelf: 'flex-start',
  },
})
