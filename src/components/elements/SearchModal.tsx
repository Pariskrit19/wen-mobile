import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Pressable, StyleSheet, View, ScrollView, Keyboard, SafeAreaView } from 'react-native'
import Modal from 'react-native-modal'
import Icon from './Icon'
import TextInputEl from './form/TextInput'
import { Colors } from 'constants/colors'
import { useAppSelector } from 'redux/hook'
import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from 'services/projects'
import { Env } from '../../env'
import { FONT_CONST, NO_INTERNET } from 'helpers/constants'
import Toast from 'react-native-toast-notifications'
import MyText from './MyText'
import { debounce } from 'helpers/utils'
interface ISearchModal {
  open: boolean
  closeModal: Function
  onChange: Function
}

const SearchModal = ({ open, closeModal, onChange }: ISearchModal) => {
  const { colors } = useTheme()
  const { darkMode } = useAppSelector((state) => state.appTheme)
  const [searchText, setSearchText] = React.useState('')
  const [tempSearch, setTempSearch] = React.useState('')
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const projectsQuery = useQuery(
    ['projects', tempSearch],
    () => getAllProjects({ project: tempSearch }),
    { enabled: !isOffline }
  )

  const handleBack = () => {
    Keyboard.dismiss()
    closeModal()
  }

  const handleCancel = () => {
    Keyboard.dismiss()
    if (searchText.length > 0) {
      setSearchText('')
      setTempSearch('')
      return
    }
    closeModal()
  }

  const handleProjectDropdown = (value: any) => {
    onChange('projectName', value?._id)
    closeModal()
  }

  const showToast = () => {
    toastRef?.current?.show(
      <View
        style={{
          backgroundColor: 'white',
          borderColor: 'rgb(173, 159, 3)',
          borderRadius: 4,
          borderWidth: 1,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(173, 159, 3,0.1)',
            padding: 15,
          }}
        >
          <Icon name="warningToast" width={20} height={20} isFill fill="rgb(173, 159, 3)" />
          <MyText
            fontStyle={FONT_CONST.rubikMedium}
            hasCustomColor
            style={{
              color: 'rgb(173, 159, 3)',
              fontSize: 14,
              marginLeft: 10,
            }}
          >
            {NO_INTERNET}
          </MyText>
        </View>
      </View>,
      {
        placement: 'top',
        style: {
          backgroundColor: 'transparent',
        },
        swipeEnabled: true,
      }
    )
  }
  React.useEffect(() => {
    if (open && isOffline && !projectsQuery?.data?.data?.data) {
      showToast()
    }
  }, [open])

  const toastRef = React.useRef()

  const searchHandler = (text: string) => {
    if (text?.length !== 1 || tempSearch?.length >= text?.length) {
      setTempSearch(text)
    }
  }

  const handleRemoveSearch = () => {
    setSearchText('')
    setTempSearch('')
  }

  const optimizedFn = React.useCallback(debounce(searchHandler, 500), [tempSearch])

  return (
    <Modal
      isVisible={open}
      useNativeDriver={false}
      style={{ margin: 0 }}
      animationOutTiming={500}
      onBackButtonPress={() => closeModal()}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Toast ref={toastRef} />
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: darkMode ? colors.background : Colors.wenBlue },
          ]}
        >
          <Pressable style={[styles.pressableContainer, { paddingLeft: 10 }]} onPress={handleBack}>
            <Icon name="BackArrow" height={20} width={20} isFill={true} fill={'#ffffff'} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <TextInputEl
              viewStyles={{
                borderWidth: 0,
                paddingLeft: 20,
                // paddingRight: 20,
              }}
              styles={{ fontSize: 14, color: colors.text }}
              placeholder="Enter Project Name"
              value={searchText}
              iconToRight={true}
              rightIcon={
                <Pressable
                  onPress={() => {
                    searchText && handleRemoveSearch()
                  }}
                >
                  <Icon
                    name={searchText ? 'close' : 'search'}
                    isFill={!!searchText}
                    fill={colors.semiIconColor}
                    width={20}
                    height={20}
                    color="black"
                    isStroke
                    stroke={colors.semiIconColor}
                  />
                </Pressable>
              }
              onChangeText={(text) => {
                setSearchText(text)
                optimizedFn(text)
              }}
              placeholderTextColor={colors.text}
            />
          </View>
          <Pressable
            style={[styles.pressableContainer, { paddingRight: 10 }]}
            onPress={handleCancel}
          >
            <Icon name="close" height={22} width={22} isFill={true} fill={'#ffffff'} />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          {[
            ...(projectsQuery?.data?.data?.data || []),
            { _id: Env.OTHER_PROJECT_ID, name: 'Other' },
          ]?.map((d: any, index: number) => (
            <Pressable onPress={() => handleProjectDropdown(d)} key={d?._id}>
              <View pointerEvents="none">
                <TextInputEl
                  readOnly={true}
                  modelOpen={true}
                  value={d?.name}
                  styles={{ alignItems: 'flex-start', textAlign: 'left' }}
                  multiline
                  viewStyles={{
                    borderWidth: 0,
                    // marginHorizontal: 5,
                    backgroundColor: colors.card,
                    marginVertical: 0,
                    borderRadius: 0,
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

export default SearchModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  pressableContainer: {
    padding: 5,
  },
  inputContainer: {
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
