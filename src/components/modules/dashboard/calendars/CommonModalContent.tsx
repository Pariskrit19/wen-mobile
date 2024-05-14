import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import SingleEventContainer from './SingleEventContainer'
import NextPreviousButtons from './NextPreviousButtons'
import SuperScriptDateFormtter from 'components/elements/SuperScriptDateFormtter'

type Props = { data: any; isClick?: boolean; swipeEnabled?: boolean }

const CommonEventModal = ({ data, isClick = false, swipeEnabled = true }: Props) => {
  const ref = React.useRef<ICarouselInstance>(null)
  const [hideNextButton, setHideNextButton] = useState(false)
  const lastIndexOfData = data.length - 1

  const onPreviousPress = () => {
    ref.current?.scrollTo({ count: -1, animated: true })

    if (hideNextButton) setHideNextButton(false)
  }
  const onNextPress = () => {
    ref.current?.scrollTo({ count: 1, animated: true })
    const nextIndex = ref.current?.getCurrentIndex()! + 1

    if (nextIndex === lastIndexOfData) setHideNextButton(true)
  }

  const onSwipe = (index: number) => {
    const isLastEvent = index === lastIndexOfData
    setHideNextButton(isLastEvent)
  }

  return (
    <View>
      {data?.isNoEvent ? (
        <View style={{ ...styles.rowStyles, marginHorizontal: 30 }}>
          <View style={styles.rectangleStyle}></View>
          <View>
            <MyText
              style={{ ...styles.titleText, width: '100%' }}
              fontStyle={FONT_CONST.rubikRegular}
            >
              No Events On
            </MyText>
            <SuperScriptDateFormtter date={data?.date} fontSize={13} style={{ marginLeft: 12 }} />
          </View>
        </View>
      ) : (
        <>
          <ScrollView>
            <Carousel
              loop={false}
              enabled={swipeEnabled}
              width={315}
              style={{
                marginHorizontal: 20,
                height: 350,
              }}
              ref={ref}
              vertical={false}
              data={data}
              renderItem={({ item }) => <SingleEventContainer item={item} isClick={isClick} />}
              onScrollEnd={onSwipe}
            />
          </ScrollView>
          {data.length > 1 ? (
            <NextPreviousButtons
              onNextPress={onNextPress}
              onPreviousPress={onPreviousPress}
              hideNextButton={hideNextButton}
            />
          ) : null}
        </>
      )}
    </View>
  )
}

export default CommonEventModal

const styles = StyleSheet.create({
  container: {},
  rowStyles: {
    marginBottom: 25,
    flexDirection: 'row',
  },
  rectangleStyle: {
    height: 20,
    width: 20,
    backgroundColor: '#50cebb',
    borderRadius: 5,
  },
  rightText: {
    fontSize: 15,
    marginLeft: 15,
    width: '90%',
  },
  titleText: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 5,
    marginLeft: 15,
    width: '90%',
  },
})
