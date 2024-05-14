import { useTheme } from '@react-navigation/native'
import ButtonEl from 'components/elements/Button'
import CommonBottomSheetModal from 'components/elements/CommonBottomSheetModal'
import KeyboardAvoidingComponent from 'components/elements/KeyboardDismissal'
import MyText from 'components/elements/MyText'
import CheckboxEl from 'components/elements/form/Checkbox'
import TextInputEl from 'components/elements/form/TextInput'
import { FONT_CONST } from 'helpers/constants'
import useForm from 'hooks/useForm'
import React, { useMemo, useState, useEffect } from 'react'
import { ActivityIndicator, Keyboard, Platform, SafeAreaView, StyleSheet, View } from 'react-native'

type Props = {
  onSubmit: () => void
  bottomSheetModalRef?: any
  title: string
  buttonText: string
  placeholderText?: string
  isPunchIn?: Boolean
}

const LatePunchInModal = ({
  onSubmit,
  bottomSheetModalRef,
  title,
  buttonText,
  isPunchIn = false,
}: Props) => {
  const { colors } = useTheme()
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const snapPoints = useMemo(() => [isPunchIn ? '50%' : '46%'], [])
  const snapPointsIOS = useMemo(
    () => (isKeyboardOpen ? ['65%'] : [isPunchIn ? '50%' : '46%']),
    [isKeyboardOpen]
  )

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true)
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false)
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <CommonBottomSheetModal
      snapPoints={Platform.OS === 'ios' ? snapPointsIOS : snapPoints}
      bottomSheetModalRef={bottomSheetModalRef}
      // onDismiss={clearValues}
    >
      <KeyboardAvoidingComponent>
        <SafeAreaView style={{ ...styles.container, backgroundColor: colors.secondBackground }}>
          <InputComponent
            onSubmit={onSubmit}
            title={title}
            buttonText={buttonText}
            isPunchIn={isPunchIn}
          />
        </SafeAreaView>
      </KeyboardAvoidingComponent>
    </CommonBottomSheetModal>
  )
}

export default LatePunchInModal

const InputComponent = ({ onSubmit, title, buttonText, isPunchIn }: Props) => {
  const initialState = {
    punchNote: { isRequired: true, value: '' },
    midDayExit: { isRequired: false, value: false },
  }
  const { colors } = useTheme()
  const handleChangeText = (value: string) => {
    onChange('punchNote', value)
  }
  const {
    onSubmit: onSubmitForm,
    onChange,
    errors,
    values,
    clearValues,
    isSubmitting,
  } = useForm(initialState, undefined, async () => {
    await onSubmit(values?.punchNote?.value.trim(), values?.midDayExit?.value)
    clearValues()
  })
  return (
    <View>
      <MyText
        style={{ ...styles.lateTitle, color: colors.subHeaderFont }}
        hasCustomColor
        fontStyle={FONT_CONST.rubikMedium}
      >
        {title}
      </MyText>
      <TextInputEl
        value={values?.punchNote?.value}
        placeholder={title}
        onChangeText={handleChangeText}
        viewStyles={styles.textInputStyles}
        styles={{ height: '100%', paddingTop: 5 }}
        multiline={true}
        error={errors?.punchNote}
        readOnly={isSubmitting}
      />
      {isPunchIn && (
        <CheckboxEl
          label={'Mid-day Exit'}
          checked={values?.midDayExit?.value}
          onPress={() => onChange('midDayExit', !values?.midDayExit?.value)}
          styles={{ marginTop: 8 }}
          disabled={isSubmitting}
          size={20}
        />
      )}
      <ButtonEl
        title={buttonText}
        onPress={onSubmitForm}
        styles={styles.buttonStyles}
        fontSize={16}
        btnTextColor="white"
        disabled={isSubmitting}
        icon={isSubmitting ? <ActivityIndicator size="small" color="white" /> : undefined}
        iconToLeft
        hasIcon
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    overflow: 'hidden',
  },
  lateTitle: {
    fontSize: 14,
    lineHeight: 16,
  },
  textInputStyles: {
    width: '100%',
    height: 120,
    alignItems: 'flex-start',
  },
  buttonStyles: {
    width: '40%',
    marginTop: 20,
  },
  modalStyles: {
    margin: 0,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
})
