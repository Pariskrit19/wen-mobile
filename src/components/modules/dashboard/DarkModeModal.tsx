import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import CommonBottomSheetModal from 'components/elements/CommonBottomSheetModal'
import MyText from 'components/elements/MyText'
import { getDarkModeConst, systemMode } from 'helpers/constants'
import React, { useCallback, useMemo, useState } from 'react'
import { View, useColorScheme } from 'react-native'
import { RadioGroup } from 'react-native-radio-buttons-group'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { toggleTheme } from 'redux/reducer/themeSlice'
import { getDarkModeStatus } from 'utils'

type Props = {}

const DarkModeModal = ({ bottomSheetModalRef }: any) => {
  const { colors } = useTheme()
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const deviceDarkMode = useColorScheme() === 'dark'
  const snapPoints = useMemo(() => ['46%'], [])
  const radioButtons = useMemo(() => getDarkModeConst(colors, darkMode), [darkMode])
  const dispatch = useAppDispatch()

  const [selectedMode, setSelectedMode] = useState<string>(systemMode)

  useFocusEffect(
    useCallback(() => {
      const getAsyncDarkMode = async () => {
        const darkModeStatus = await AsyncStorage.getItem('darkMode')
        setSelectedMode(darkModeStatus ?? systemMode)
      }
      getAsyncDarkMode()
    }, [])
  )

  const handlePress = async (e: string) => {
    const darkMode = getDarkModeStatus(e, deviceDarkMode)
    setSelectedMode(e)
    dispatch(toggleTheme(darkMode))
    await AsyncStorage.setItem('darkMode', e)
  }

  return (
    <CommonBottomSheetModal bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints}>
      <View style={{ backgroundColor: colors.card }}>
        <MyText
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            paddingLeft: 30,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
          }}
        >
          Dark mode
        </MyText>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={handlePress}
          selectedId={selectedMode}
          labelStyle={{
            color: darkMode ? 'rgb(229, 229, 231)' : '#747688',
            fontSize: 18,
            fontWeight: '500',
          }}
          containerStyle={{
            alignItems: 'flex-start',
            rowGap: 10,
            marginLeft: 20,
            marginTop: 20,
          }}
        />
      </View>
    </CommonBottomSheetModal>
  )
}

export default DarkModeModal
