import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { useTheme } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { AttendanceRoutes } from 'constants/routes'
import CommonNativeModal from 'components/elements/CommonNativeModal'

type Props = {
  openModal: boolean
  handleModal: () => void
  navigation: any
}

const HistoryAttendanceModal = ({ openModal, handleModal, navigation }: Props) => {
  const { colors } = useTheme()
  return (
    <CommonNativeModal
      show={openModal}
      backdropColor="transparent"
      handleModalShow={handleModal}
      animationTimeIn={1}
      animationTimeOut={1}
    >
      <View style={{ ...styles.modalStyles, backgroundColor: colors.attendanceHistory }}>
        <Pressable
          onPress={() => {
            navigation.navigate(AttendanceRoutes.Attendance)
            handleModal()
          }}
        >
          <MyText style={{ fontSize: 16 }} fontStyle="bold">
            History
          </MyText>
        </Pressable>
      </View>
    </CommonNativeModal>
  )
}

export default HistoryAttendanceModal

const styles = StyleSheet.create({
  modalStyles: {
    flex: 1,
    position: 'absolute',
    height: 50,
    right: 10,
    top: 40,
    padding: 10,
    paddingHorizontal: 15,
    elevation: 10,
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    alignItems: 'center',
    justifyContent: 'center',
  },
})
