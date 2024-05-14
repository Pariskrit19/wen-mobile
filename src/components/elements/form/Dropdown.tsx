import * as React from 'react'
import MyText from '../MyText'
import { View } from 'react-native'

interface IDropdownProps {
  value: any
}

const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  return (
    <View>
      <MyText>Dropdown</MyText>
    </View>
  )
}

export default Dropdown
