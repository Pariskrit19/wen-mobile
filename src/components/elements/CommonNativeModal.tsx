import React from 'react'
import Modal, { Direction } from 'react-native-modal'

type Props = {
  children: JSX.Element
  show: boolean
  backdropColor?: string
  handleModalShow: () => void
  styles?: Object
  animationTimeOut?: number
  animationTimeIn?: number
  backdropTransitionIn?: number
  backdropTransitionOut?: number
  useNativeDriver?: boolean
  useNativeDriverForBackdrop?: boolean
  coverScreen?: boolean
  swipeDirection?: Direction | Array<Direction> | string
}

const CommonNativeModal = ({
  children,
  handleModalShow,
  show,
  backdropColor = 'rgba(0, 0, 0, 0.8)',
  styles,
  animationTimeIn,
  animationTimeOut,
  backdropTransitionIn,
  backdropTransitionOut,
  useNativeDriver = false,
  useNativeDriverForBackdrop = false,
  coverScreen = true,
  swipeDirection = 'down',
}: Props) => {
  return (
    <Modal
      style={styles}
      propagateSwipe // required to handle any scrollview inside the modal
      backdropColor={backdropColor}
      isVisible={show}
      coverScreen={coverScreen}
      onBackdropPress={handleModalShow}
      onSwipeComplete={() => {
        handleModalShow()
      }}
      onBackButtonPress={handleModalShow}
      animationInTiming={animationTimeIn}
      animationOutTiming={animationTimeOut}
      backdropTransitionInTiming={backdropTransitionIn}
      backdropTransitionOutTiming={backdropTransitionOut}
      useNativeDriver={useNativeDriver}
      useNativeDriverForBackdrop={useNativeDriverForBackdrop}
      swipeDirection={swipeDirection === 'undefined' ? undefined : swipeDirection}
      animationIn="slideInUp"
      animationOut={'slideOutDown'}
      swipeThreshold={100}
      hideModalContentWhileAnimating={true}
    >
      {children}
    </Modal>
  )
}

export default CommonNativeModal
