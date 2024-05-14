import { useTheme } from '@react-navigation/native'
import CommonNativeModal from 'components/elements/CommonNativeModal'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import CommonEventModal from './CommonModalContent'

type Props = {
  data: any
  handleModal: any
  modalVisible: boolean
}

const EventModal = ({ data, handleModal, modalVisible }: Props) => {
  const { colors } = useTheme()
  return (
    <CommonNativeModal
      show={modalVisible}
      backdropColor="white"
      handleModalShow={handleModal}
      animationTimeIn={0.3}
      animationTimeOut={0.3}
      swipeDirection="undefined"
    >
      <View
        style={{
          ...styles.modalStyles,
          backgroundColor: colors.attendanceHistory,
          height: data?.isNoEvent ? 200 : 350,
        }}
      >
        <CommonEventModal data={data} isClick />
      </View>
    </CommonNativeModal>
  )
}

export default EventModal

const styles = StyleSheet.create({
  modalStyles: {
    elevation: 5,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    justifyContent: 'center',
    paddingVertical: 20,
  },
})
