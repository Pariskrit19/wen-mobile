import MyText from 'components/elements/MyText'
import { FONT_CONST, months } from 'helpers/constants'
import React, { MutableRefObject, useRef } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@react-navigation/native'

type Props = {
  indexs: number
  setIndexs: (value: any) => void
  carouselRef: MutableRefObject<undefined>
}
const todayMonth = new Date().getMonth()

const MonthCarousel = ({ indexs, setIndexs, carouselRef }: Props) => {
  const indexRef = useRef<number>(todayMonth + 1)
  const { colors } = useTheme()
  const SLIDER_WIDTH = Dimensions.get('window').width + 100
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.27)

  const monthsDataFromThisMonth = months
    .slice(todayMonth - 1)
    .concat(months.slice(0, todayMonth - 1))

  const handleCarouselShift = (itemId: number) => {
    setIndexs(itemId)
    let countIndex = itemId - indexRef.current
    if (countIndex < 0) {
      countIndex = 12 + countIndex
    }
    if (countIndex < 12 && countIndex !== 0) {
      carouselRef?.current?.scrollTo({
        //scroll to left or right depending on countIndex.
        count: countIndex > 5 ? -1 : 1,
        animated: true,
      })
    }
  }

  const CarouselCardItem = ({
    item,
    index,
  }: {
    item: { id: number; name: string }
    index: number
  }) => {
    return (
      <Pressable onPress={() => handleCarouselShift(item.id)}>
        <View key={index}>
          {item.id === indexs ? (
            <LinearGradient
              colors={['#4363C6', '#05A9C5']}
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MyText
                style={{
                  ...styles.monthText,
                  paddingVertical: 10,
                  color: 'white',
                }}
                fontStyle={FONT_CONST.rubikRegular}
              >
                {item.name}
              </MyText>
            </LinearGradient>
          ) : (
            <MyText
              style={{
                padding: 8,
                color: colors.descriptionFont,
                ...styles.monthText,
              }}
              hasCustomColor
              fontStyle={FONT_CONST.rubikRegular}
            >
              {item.name}
            </MyText>
          )}
        </View>
      </Pressable>
    )
  }

  return (
    <View
      style={{
        marginTop: 20,
        height: 36,
        justifyContent: 'center',
      }}
    >
      <Carousel
        ref={carouselRef}
        loop
        width={ITEM_WIDTH}
        data={monthsDataFromThisMonth}
        style={{ width: SLIDER_WIDTH }}
        scrollAnimationDuration={200}
        onSnapToItem={(val) => {
          //val is the value of center item
          indexRef.current = (val + todayMonth + 1) % 12
        }}
        renderItem={CarouselCardItem}
      />
    </View>
  )
}

export default MonthCarousel

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 30,
  },
  monthText: {
    fontSize: 14,
    textAlign: 'center',
    borderRadius: 15,
    lineHeight: 15,
  },
})
