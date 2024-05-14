import { Entypo } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import { LeaveRoutes } from 'constants/routes'
import React, { useState } from 'react'
import { Button, Pressable, View } from 'react-native'
import Modal from 'react-native-modal'

type Props = {}

const LeaveMenuComponent = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [showModal, setShowModal] = useState(false)

  const handleToggle = () => setShowModal((prev) => !prev)
  return (
    <Pressable onPress={() => setShowModal((prev) => !prev)}>
      <Modal
        isVisible={showModal}
        backdropColor="transparent"
        animationInTiming={1}
        animationOutTiming={1}
        style={{ backgroundColor: 'white', position: 'absolute', right: 10, top: 20 }}
        onBackdropPress={handleToggle}
      >
        <View
          style={{
            backgroundColor: 'white',
            height: 100,
            padding: 5,
            elevation: 10,
            borderRadius: 5,
          }}
        >
          <MyText style={{ color: 'red' }}>Hello!</MyText>
          <Button title="Hide modal" onPress={() => navigation.navigate(LeaveRoutes.AddLeave)} />
        </View>
      </Modal>
      <Entypo name="dots-three-vertical" size={24} color="black" />
    </Pressable>
  )
}

export default LeaveMenuComponent
