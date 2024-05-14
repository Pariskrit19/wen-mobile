import * as React from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import Modal from 'react-native-modal'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { CommonInitialState, toggleErrorModal } from 'redux/reducer/commonSlice'
import { formStyles } from 'styles/form'
import Button from './Button'
import Icon from './Icon'
import MyText from './MyText'

interface IErrorDialogProps {}

const ErrorDialog: React.FunctionComponent<IErrorDialogProps> = (props) => {
  const scheme = useColorScheme()
  const {
    errorDialogInfo: { title, msg, showModal, iconName },
  } = useAppSelector((state: { common: CommonInitialState }) => state.common)
  const dispatch = useAppDispatch()
  return (
    <>
      {showModal && (
        <Modal
          isVisible={showModal}
          style={{ paddingHorizontal: 10 }}
          animationIn="slideInUp"
          animationOut="fadeOut"
          backdropOpacity={0.5}
          animationOutTiming={300}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating
          backdropTransitionInTiming={1000}
          onBackdropPress={() => dispatch(toggleErrorModal({ showModal: false }))}
          backdropColor={scheme === 'dark' ? '#ffffff20' : '#5e5d5d'}
        >
          <View style={styles.errBody}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
              }}
            >
              <Icon name={iconName} size={70} />
            </View>
            <MyText style={{ textAlign: 'center', fontSize: 18 }} fontStyle="medium">
              {title}
            </MyText>
            <MyText style={{ textAlign: 'center', marginTop: 15 }}>{msg}</MyText>
            <View style={{ ...formStyles.formRow, justifyContent: 'center', alignItems: 'center' }}>
              <Button
                hasIcon
                onPress={() => dispatch(toggleErrorModal({ showModal: false }))}
                title="Ok"
                btnWidth={60}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  errBody: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 5,
  },
})
export default ErrorDialog
